import { InvalidCredentialsError, InvalidInputError, NotFoundError, prisma } from "@/shared/server";
import { changePasswordServerSchema, ChangePasswordType } from "../model";
import { AuthenticatedUser } from "@/features/auth";
import { comparePassword, hashPassword } from "@/shared";

interface ChangePasswordServiceProps {
  body: ChangePasswordType,
  user: AuthenticatedUser,
}

export const changePasswordService = async ({ user, body }: ChangePasswordServiceProps): Promise<void> => {
  const validated = changePasswordServerSchema.parse(body)
  try {
    if (validated.newPassword === validated.currentPassword) throw new InvalidInputError('New password must differ from current');

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!existingUser) throw new NotFoundError('User');//This is a test for TypeScript. I retrieve a user from apiHandler

    const isPasswordValid = await comparePassword(validated.currentPassword, existingUser.password);
    if (!isPasswordValid) throw new InvalidCredentialsError();

    const hashedPassword = await hashPassword(validated.newPassword);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
    })

  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof InvalidInputError) {
      throw error;
    }

    if (error instanceof InvalidCredentialsError) {
      throw error;
    }

    console.log('Prisma Error in validateEmailForResend:', error);
    throw error;
  }
}