import { AppLocale } from "@/shared/lib/i18n/config";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: string;
  }>;
}

export interface VerificationEmailData {
  name: string;
  code: string;
  verificationLink: string;
  expiresIn: string;
  locale: AppLocale;
}

export interface ConfirmationEmailData {
  name: string;
  email: string;
  locale: AppLocale;
}

export interface ChangePasswordData {
  name: string;
  locale: AppLocale;
}

export interface SendVerificationEmailInput {
  email: string;
  name: string;
  code: string;
  token: string;
  locale: AppLocale;
}

export interface SendConfirmationEmailInput {
  email: string;
  name: string;
  locale: AppLocale;
}

export interface SendChangePasswordEmailInput {
  email: string;
  name: string;
  locale: AppLocale;
}
