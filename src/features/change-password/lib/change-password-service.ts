import { prisma } from "@/shared/server";
import { changePasswordServerSchema, ChangePasswordType } from "../model";
import { AuthenticatedUser } from "@/features/auth";
import { comparePassword, hashPassword } from "@/shared";
import { InvalidPasswordError, SamePasswordError } from "../model/server";
import { UserNotFoundError } from "@/entities/server";

interface ChangePasswordServiceProps {
  body: ChangePasswordType,
  user: AuthenticatedUser,
}

export const changePasswordService = async ({ user, body }: ChangePasswordServiceProps): Promise<void> => {
  const validated = changePasswordServerSchema.parse(body)
  try {
    if (validated.newPassword === validated.currentPassword) throw new SamePasswordError();

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!existingUser) throw new UserNotFoundError();//This is a test for TypeScript. I retrieve a user from apiHandler

    const isPasswordValid = await comparePassword(validated.currentPassword, existingUser.password);
    if (!isPasswordValid) throw new InvalidPasswordError();

    const hashedPassword = await hashPassword(validated.newPassword);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
    })

  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw error;
    }

    if (error instanceof SamePasswordError) {
      throw error;
    }

    if (error instanceof InvalidPasswordError) {
      throw error;
    }

    console.log('Prisma Error in validateEmailForResend:', error);
    throw error;
  }
}