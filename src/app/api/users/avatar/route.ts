import { deleteFile } from '@/entities/server';
import { AuthenticatedUser, UploadAvatarType } from '@/features';
import { AvatarUpdateForbiddenError, uploadAvatar } from '@/features/server';
import { apiHandler } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<string | { error: string }>> => {
    let imageToCleanup: string | null = null
    try {
      const body: UploadAvatarType = await request.json();
      imageToCleanup = body.image;
      await uploadAvatar(body, user.id)
      if (user.imageUrl) await deleteFile(user.imageUrl)

      return NextResponse.json("");
    } catch (error) {
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

      if (error instanceof AvatarUpdateForbiddenError) {
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