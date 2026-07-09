import { getTranslations } from "next-intl/server";
import { VerificationEmailData } from "../../model/types";

export const verificationEmailTemplate = async ({ name, code, expiresIn, verificationLink, locale }: VerificationEmailData): Promise<string> => {
  const t = await getTranslations({ locale, namespace: 'email.verification-email-template' });

  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .code { 
            font-size: 32px; 
            font-weight: bold; 
            text-align: center; 
            letter-spacing: 8px;
            color: #4CAF50;
            margin: 20px 0;
            padding: 10px;
            background: white;
            border-radius: 8px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${t("subject")}</h1>
          </div>
          <div class="content">
            <h2>${t("greeting", { name })}</h2>
            <p>${t("thank-you")}</p>
            <p>${t("instruction")}</p>
            <p style="text-align: center;">
              <a href="${verificationLink}" class="button">${t("confirm-button")}</a>
            </p>
            <p>${t("code-label")}<strong>${code}</strong></p>
            <p>${t("manual-link")}</p>
            <p style="word-break: break-all; color: #4CAF50;">${verificationLink}</p>
            <p><strong>${t("expires-in", { time: expiresIn })}</strong></p>
            <p style="color: #888; font-size: 14px;">${t("ignore")}</p>
          </div>
          <div class="footer">
             <p>${t("footer")}</p>
          </div>
        </div>
      </body>
      </html>
    `;
};