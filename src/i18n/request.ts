import { getRequestConfig } from 'next-intl/server';
import { routing } from '../shared/lib/i18n/routing';
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as string,
    messages: {
      ...(await import(`../shared/lib/i18n/locales/${locale}/common.json`)).default,
      groups: (await import(`../shared/lib/i18n/locales/${locale}/groups.json`)).default,
      parish: (await import(`../shared/lib/i18n/locales/${locale}/parish.json`)).default,
      sidebar: (await import(`../shared/lib/i18n/locales/${locale}/sidebar.json`)).default,
      header: (await import(`../shared/lib/i18n/locales/${locale}/header.json`)).default,
      metadata: (await import(`../shared/lib/i18n/locales/${locale}/metadata.json`)).default,
      "add-product": (await import(`../shared/lib/i18n/locales/${locale}/add-product.json`)).default,
      "add-parish": (await import(`../shared/lib/i18n/locales/${locale}/add-parish.json`)).default,
      "header-search": (await import(`../shared/lib/i18n/locales/${locale}/header-search.json`)).default,
      "parishes-page": (await import(`../shared/lib/i18n/locales/${locale}/parishes-page.json`)).default,
      "groups-page": (await import(`../shared/lib/i18n/locales/${locale}/groups-page.json`)).default,
      "parishes-id-page": (await import(`../shared/lib/i18n/locales/${locale}/parishes-id-page.json`)).default,
      "products-list": (await import(`../shared/lib/i18n/locales/${locale}/products-list.json`)).default,
      "products": (await import(`../shared/lib/i18n/locales/${locale}/products.json`)).default,
      "view-product-details": (await import(`../shared/lib/i18n/locales/${locale}/view-product-details.json`)).default,
      "products-explore": (await import(`../shared/lib/i18n/locales/${locale}/products-explore.json`)).default,
      "products-page": (await import(`../shared/lib/i18n/locales/${locale}/products-page.json`)).default,
      "categories-page": (await import(`../shared/lib/i18n/locales/${locale}/categories-page.json`)).default,
      "category": (await import(`../shared/lib/i18n/locales/${locale}/category.json`)).default,
      "add-category": (await import(`../shared/lib/i18n/locales/${locale}/add-category.json`)).default,
      "categories-id-page": (await import(`../shared/lib/i18n/locales/${locale}/categories-id-page.json`)).default,
      "users-page": (await import(`../shared/lib/i18n/locales/${locale}/users-page.json`)).default,
      "users-list": (await import(`../shared/lib/i18n/locales/${locale}/users-list.json`)).default,
      "user": (await import(`../shared/lib/i18n/locales/${locale}/user.json`)).default,
      "about-us": (await import(`../shared/lib/i18n/locales/${locale}/about-us.json`)).default,
      "category-chart": (await import(`../shared/lib/i18n/locales/${locale}/category-chart.json`)).default,
      "house-map": (await import(`../shared/lib/i18n/locales/${locale}/house-map.json`)).default,
      "auth-gate": (await import(`../shared/lib/i18n/locales/${locale}/auth-gate.json`)).default,
      "auth-page": (await import(`../shared/lib/i18n/locales/${locale}/auth-page.json`)).default,
      "auth": (await import(`../shared/lib/i18n/locales/${locale}/auth.json`)).default,
      "email": (await import(`../shared/lib/i18n/locales/${locale}/email.json`)).default,
      "verify-page": (await import(`../shared/lib/i18n/locales/${locale}/verify-page.json`)).default,
      "verify-email": (await import(`../shared/lib/i18n/locales/${locale}/verify-email.json`)).default,
      "not-found": (await import(`../shared/lib/i18n/locales/${locale}/not-found.json`)).default,
      "settings-page": (await import(`../shared/lib/i18n/locales/${locale}/settings-page.json`)).default,
      "avatar-upload": (await import(`../shared/lib/i18n/locales/${locale}/avatar-upload.json`)).default,
      "change-password": (await import(`../shared/lib/i18n/locales/${locale}/change-password.json`)).default,
    }
  };
});