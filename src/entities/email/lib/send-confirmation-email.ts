import { SendConfirmationEmailInput } from '../model/types';
import { sendEmail } from './send';
import { confirmationEmailTemplate } from './templates/server';
import { getTranslations } from 'next-intl/server';

export async function sendConfirmationEmail({ email, name, locale }: SendConfirmationEmailInput): Promise<void> {
  const t = await getTranslations({ locale, namespace: 'email.send-confirmation-email' });

  const html = await confirmationEmailTemplate({
    name,
    email,
    locale: locale,
  });

  await sendEmail({
    to: email,
    subject: t("subject"),
    html,
    text: t("text", { name }),
  });
}
