import crypto from 'crypto';
import { VerificationCodeInput, VerificationCodeOutput } from "../types";
import { VERIFICATION_CONFIG } from '@/shared/constants/verification';
import { prisma } from '@/shared/lib/prisma';
import { ExpiredError, NotFoundError } from '@/shared/lib/server';

export const createVerificationCode = async ({ email, userId }: VerificationCodeInput): Promise<VerificationCodeOutput> => {
  try {
    await deleteVerificationCodesByEmail(email)

    const token = crypto.randomBytes(VERIFICATION_CONFIG.TOKEN_BYTES).toString('base64url');
    const codeMin = Math.pow(10, VERIFICATION_CONFIG.CODE_LENGTH - 1);
    const codeMax = Math.pow(10, VERIFICATION_CONFIG.CODE_LENGTH) - codeMin;
    const code = Math.floor(codeMin + Math.random() * codeMax).toString();

    const expiresAt = new Date(Date.now() + VERIFICATION_CONFIG.EXPIRATION_MINUTES * 60 * 1000);

    const verificationCode = await prisma.verificationCode.create({
      data: {
        email,
        token,
        code,
        userId,
        expiresAt,
      },
      select: {
        token: true,
        code: true,
      }
    });

    return verificationCode
  } catch (error) {
    console.error('Prisma Error in createVerificationCode:', error);
    throw error;
  }
};

export const validateVerificationToken = async (token: string): Promise<{ email: string }> => {
  try {
    const existingVerification = await prisma.verificationCode.findUnique({
      where: { token },
      select: {
        email: true,
        expiresAt: true,
      }
    })

    if (!existingVerification) throw new NotFoundError("Verification token");

    const email = existingVerification.email

    if (existingVerification.expiresAt < new Date()) throw new ExpiredError("Expired token", email);

    return { email }
  } catch (error) {
    if (error instanceof ExpiredError || error instanceof NotFoundError) {
      throw error;
    }

    console.error('Prisma Error in validateVerificationToken:', error);
    throw error;
  }
}

export const deleteVerificationCodesByEmail = async (email: string): Promise<void> => {
  try {
    await prisma.verificationCode.deleteMany({
      where: { email },
    });
  } catch (error) {
    console.error('Prisma Error in deleteVerificationCodesByEmail:', error);
    throw error;
  }
};