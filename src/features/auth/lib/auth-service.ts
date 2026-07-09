import { prisma } from "@/shared/lib/prisma";
import { AuthSignIn, AuthSignUp, AuthenticatedUser, ResendVerification } from "../model/types";
import { loginFormServerSchema, registerFormServerSchema, resendVerificationServerSchema } from "../model/schemas";
import { EmailNotFoundError, EmailNotVerifiedError, InvalidCredentialsError, UserAlreadyExistsError } from "../server";
import { comparePassword, COOKIE_KEYS, hashPassword, signToken, verifyToken } from "@/shared";
import { cookies } from "next/headers";

export const authorizeRequest = async ({ id, email }: { id?: string, email?: string }): Promise<AuthenticatedUser | null> => {
  try {
    return await prisma.user.findFirst({
      where: {
        OR: [{ id }, { email }],
        verifiedAt: { not: null }
      },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        imageUrl: true,
      }
    });
  } catch (error) {
    console.error('Prisma Error in authorizeRequest:', error);
    throw error;
  }
}

export const authRegister = async (body: AuthSignUp): Promise<AuthenticatedUser> => {
  const validated = registerFormServerSchema.parse(body)
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser && existingUser.verifiedAt === null) throw new EmailNotVerifiedError();
    if (existingUser) throw new UserAlreadyExistsError()

    const hashedPassword = await hashPassword(validated.password);
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        imageUrl: true,
      },
    });

    return user
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      throw error;
    }
    if (error instanceof EmailNotVerifiedError) {
      throw error;
    }
    console.log('Prisma Error in authRegister:', error);
    throw error;
  }
}

export const authLogin = async (body: AuthSignIn): Promise<{ user: AuthenticatedUser, token: string }> => {
  const validated = loginFormServerSchema.parse(body)
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
        imageUrl: true,
        verifiedAt: true,
      }
    });
    if (!existingUser) throw new InvalidCredentialsError()

    const { password, verifiedAt, ...user } = existingUser;
    const isPasswordValid = await comparePassword(validated.password, password);
    if (!isPasswordValid) throw new InvalidCredentialsError();
    if (!verifiedAt) throw new EmailNotVerifiedError();

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token }
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      throw error;
    }
    if (error instanceof EmailNotVerifiedError) {
      throw error;
    }
    console.log('Prisma Error in authLogout:', error);
    throw error;
  }
}

export const getSessionUser = async (): Promise<AuthenticatedUser | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_KEYS.AUTH_TOKEN)?.value;

    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Get session user error:', error);
    return null;
  }
}

export const validateEmailForResend = async (body: ResendVerification): Promise<AuthenticatedUser> => {
  const validated = resendVerificationServerSchema.parse(body)
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: validated.email, verifiedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        imageUrl: true,
      },
    });

    if (!existingUser) throw new EmailNotFoundError()

    return existingUser
  } catch (error) {
    if (error instanceof EmailNotFoundError) {
      throw error;
    }

    console.log('Prisma Error in validateEmailForResend:', error);
    throw error;
  }
}

export const activateUserByEmail = async (email: string) => {
  try {
    await prisma.user.update({
      where: { email },
      data: { verifiedAt: new Date() },
    });
  } catch (error) {
    console.log('Prisma Error in activateUserByEmail:', error);
    throw error;
  }
}