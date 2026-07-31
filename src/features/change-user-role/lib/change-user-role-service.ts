import { ForbiddenError, InvalidInputError, prisma } from "@/shared/lib/server";
import { signToken } from "@/shared/lib/auth";
import { ChangeUserRoleType, UserRoleType } from "../model/types";
import { AuthenticatedUser } from "@/features/auth/model/types";
import { changeUserRoleServerSchema } from "../model/schemas-server";

interface ChangeUserRoleServiceProps {
  body: ChangeUserRoleType,
  user: AuthenticatedUser,
}

export const changeUserRoleService = async ({ user, body }: ChangeUserRoleServiceProps): Promise<{ role: UserRoleType, token: string }> => {
  const validated = changeUserRoleServerSchema.parse(body)

  try {
    if (user.id !== validated.userId) throw new ForbiddenError('No access');
    if (user.role === validated.role) throw new InvalidInputError('User already has this role')

    const { id, email, role } = await prisma.user.update({
      where: { id: user.id },
      data: { role: validated.role },
      select: {
        id: true,
        email: true,
        role: true,
      }
    })

    const token = await signToken({
      userId: id,
      email,
      role,
    });

    return { role: validated.role, token }
  } catch (error) {
    if (error instanceof ForbiddenError) {
      throw error;
    }

    if (error instanceof InvalidInputError) {
      throw error;
    }

    console.log('Error in changeUserRoleService:', error);
    throw error;
  }
}