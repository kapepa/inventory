import { NotFoundError, prisma } from "@/shared/lib/server";
import { VerifyCodeEmail } from "../model/types";
import { codeFormServerSchema } from "../model/schemas-server";

export const validateVerificationCode = async (body: VerifyCodeEmail): Promise<{ email: string, name: string }> => {
  const validated = codeFormServerSchema.parse(body)
  try {
    const existingVerificationCode = await prisma.verificationCode.findFirst({
      where: {
        code: validated.code,
        email: validated.email,
        token: validated.token,
        expiresAt: { gt: new Date() },
      },
      select: {
        email: true,
        expiresAt: true,
        user: {
          select: {
            name: true,
          }
        }
      }
    });

    if (!existingVerificationCode) throw new NotFoundError('Verification code');

    return { email: existingVerificationCode.email, name: existingVerificationCode.user!.name }
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error('Prisma Error in validateVerificationCode:', error);
    throw error;
  }
}