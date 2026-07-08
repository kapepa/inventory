import { QUERY_PARAMS_KEYS, ROUTES } from '@/shared';
import { sendEmail } from './send';
import { verificationEmailTemplate } from './templates/server';
import { getTranslations } from 'next-intl/server';
import { SendVerificationEmailInput } from '../model';

type SendVerificationEmailOutput = { verificationLink: string }

export async function sendVerificationEmail({ email, name, code, token, locale }: SendVerificationEmailInput): Promise<SendVerificationEmailOutput> {
  const t = await getTranslations({ locale, namespace: 'email.send-verification-email' });
  const verificationLink = `${process.env.APP_URL}${ROUTES.VERIFY}?${QUERY_PARAMS_KEYS.VERIFY_TOKEN}=${token}`;

  const html = await verificationEmailTemplate({
    name,
    code,
    verificationLink,
    expiresIn: "1",
    locale: locale,
  });

  await sendEmail({
    to: email,
    subject: t("subject"),
    html,
    text: t("text", { name, link: verificationLink }),
  });

  return { verificationLink }
}
