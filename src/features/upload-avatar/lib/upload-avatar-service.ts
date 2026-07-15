import { ForbiddenError, prisma } from "@/shared/server";
import { avatarUploadServerSchema, UploadAvatarType } from "../model";

export const uploadAvatar = async (body: UploadAvatarType, currentUserId: string): Promise<void> => {
  const validated = avatarUploadServerSchema.parse(body)
  try {
    if (currentUserId !== validated.userId) throw new ForbiddenError('You can only update your own avatar');
    await prisma.user.update({
      where: { id: validated.userId },
      data: {
        imageUrl: validated.image
      },
    })
  } catch (error) {
    if (error instanceof ForbiddenError) {
      throw error;
    }
    console.error('Prisma Error in createProduct:', error);
    throw error;
  }
}