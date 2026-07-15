import { ForbiddenError, InvalidInputError, NotFoundError, prisma } from "@/shared/server";
import { changeUserRoleServerSchema, ChangeUserRoleType } from "../model";
import { AuthenticatedUser } from "@/features/auth";

interface ChangeUserRoleServiceProps {
  body: ChangeUserRoleType,
  user: AuthenticatedUser,
}

export const changeUserRoleService = async ({ user, body }: ChangeUserRoleServiceProps): Promise<void> => {
  const validated = changeUserRoleServerSchema.parse(body)

  try {
    if (user.id !== validated.userId) throw new ForbiddenError('No access');

    const existingUser = await prisma.user.findUnique({
      where: { id: validated.userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!existingUser) throw new NotFoundError('User');//This is a test for TypeScript. I retrieve a user from apiHandler
    if (existingUser.role === validated.role) throw new InvalidInputError('User already has this role')

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { role: validated.role }
    })

  } catch (error) {
    if (error instanceof ForbiddenError) {
      throw error;
    }

    if (error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof InvalidInputError) {
      throw error;
    }

    console.log('Error in changeUserRoleService:', error);
    throw error;
  }
}