import { prisma } from "@/shared/server";
import { avatarUploadServerSchema, UploadAvatarType } from "../model";
import { AvatarUpdateForbiddenError } from "../server";

export const uploadAvatar = async (body: UploadAvatarType, currentUserId: string): Promise<void> => {
  const validated = avatarUploadServerSchema.parse(body)
  try {
    if (currentUserId !== validated.userId) throw new AvatarUpdateForbiddenError();
    await prisma.user.update({
      where: { id: validated.userId },
      data: {
        imageUrl: validated.image
      },
    })
  } catch (error) {
    if (error instanceof AvatarUpdateForbiddenError) {
      throw error;
    }
    console.error('Prisma Error in createProduct:', error);
    throw error;
  }
}