import { sendEmail } from './send';
import { changePasswordEmailTemplate } from './templates/server';
import { getTranslations } from 'next-intl/server';
import { SendChangePasswordEmailInput } from '../model';

export async function sendChangePasswordEmail({ email, name, locale }: SendChangePasswordEmailInput): Promise<void> {
  const t = await getTranslations({ locale, namespace: 'email.send-change-password-email' });

  const html = await changePasswordEmailTemplate({
    name,
    locale: locale,
  });

  await sendEmail({
    to: email,
    subject: t("subject"),
    html,
    text: t("text", { name }),
  });
}
