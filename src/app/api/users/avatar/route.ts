import { deleteFile } from '@/entities/server';
import { AuthenticatedUser, UploadAvatarType } from '@/features';
import { uploadAvatar } from '@/features/server';
import { apiHandler, ForbiddenError } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<{ success: boolean } | { error: string }>> => {
    let imageToCleanup: string | null = null
    try {
      const body: UploadAvatarType = await request.json();
      imageToCleanup = body.image;
      await uploadAvatar(body, user.id)
      if (user.imageUrl) await deleteFile(user.imageUrl)

      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      if (imageToCleanup) {
        try {
          await deleteFile(imageToCleanup);
        } catch (deleteError) {
          console.error('Failed to clean up uploaded file in Cloudinary:', deleteError);
        }
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'Invalid data format', details: error.format() },
          { status: 400 }
        );
      }

      if (error instanceof ForbiddenError) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        );
      }

      console.error('Failed to set avatar:', error);
      return NextResponse.json(
        { error: 'Failed to set avatar' },
        { status: 500 }
      );
    }
  });