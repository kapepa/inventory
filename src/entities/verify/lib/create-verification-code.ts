import { prisma } from "@/shared/server";
import crypto from 'crypto';
import { VerificationCodeInput, VerificationCodeOutput } from "../types";
import { VERIFICATION_CONFIG } from "@/shared";
import { TokenExpiredError, TokenNotFoundError } from "../server";

export const createVerificationCode = async ({ email, userId }: VerificationCodeInput): Promise<VerificationCodeOutput> => {
  try {
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

    if (!existingVerification) throw new TokenNotFoundError();
    if (existingVerification.expiresAt < new Date()) throw new TokenExpiredError(existingVerification.email);

    return { email: existingVerification.email }
  } catch (error) {
    if (error instanceof TokenExpiredError || error instanceof TokenNotFoundError) {
      throw error;
    }

    console.error('Prisma Error in validateVerificationToken:', error);
    throw error;
  }
}