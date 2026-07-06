import { prisma } from "@/shared/server";
import crypto from 'crypto';
import { VerificationCodeInput, VerificationCodeOutput } from "../types";
import { VERIFICATION_CONFIG } from "@/shared";

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