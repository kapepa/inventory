import { getTranslations } from "next-intl/server";
import { ChangePasswordData } from "../../model/types";

export const changePasswordEmailTemplate = async ({ name, locale }: ChangePasswordData): Promise<string> => {
  const t = await getTranslations({ locale, namespace: 'email.change-password-email-template' });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; background: #f9f9f9; }
        .success-icon { 
          text-align: center; 
          font-size: 48px; 
          margin: 20px 0;
        }
        .email-badge {
          display: inline-block;
          background: #E8F5E9;
          color: #2E7D32;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          margin: 10px 0;
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
        .footer { 
          text-align: center; 
          padding: 20px; 
          font-size: 12px; 
          color: #666; 
          background: #f0f0f0;
          border-radius: 0 0 8px 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${t("subject")}</h1>
        </div>
        <div class="content">
          <div class="success-icon">✅</div>
          <h2>${t("greeting", { name })}</h2>
          <p>${t("success-message")}</p>
          <p>${t("access-message")}</p>
          <p style="text-align: center;">
            <a href="${process.env.APP_URL}" class="button">${t("go-to-app")}</a>
          </p>
          <p style="color: #888; font-size: 14px;">${t("security-note")}</p>
        </div>
        <div class="footer">
          <p>${t("footer")}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};