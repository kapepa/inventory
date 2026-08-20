import { EmailSendError } from '@/shared/lib/server';
import { transporter } from '../config/transport';
import { EmailOptions } from '../model/types/types';

export async function sendEmail(options: EmailOptions): Promise<void> {
  // Skip email sending in test environment
  if (process.env.NODE_ENV === 'test' || process.env.EMAIL_ENABLED === 'false') {
    console.log('Email skipped in test mode:', options.to);
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });

    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new EmailSendError('Failed to send email notification');
  }
}