import { Metadata } from "next";
import { AppLocale } from "./i18n/config";

export type MetaKeys =
  | "parishes"
  | "groups"
  | "parishes-id"
  | "products"
  | "categories"
  | "categories-id"
  | "users"
  | "about-us"
  | "login"
  | "register"
  | "verify"
  | "settings";

interface GeneratePageMetadataOptions {
  locale: AppLocale;
  key: MetaKeys;
  titleParams?: Record<string, string>;
}

interface PageMetadata {
  title: string;
  description: string;
}

const MetadataStore: Record<AppLocale, Record<MetaKeys, PageMetadata>> = {
  en: {
    "parishes": {
      "title": "Parishes — Inventory",
      "description": "Manage and view your list of parishes."
    },
    "groups": {
      "title": "Groups — Inventory",
      "description": "Manage and view your groups."
    },
    "parishes-id": {
      "title": "Parishe — {title}",
      "description": "Viewing and Managing Incoming Goods."
    },
    "products": {
      "title": "Products — Inventory",
      "description": "View and Manage Your Products."
    },
    "categories": {
      "title": "Categories — Inventory",
      "description": "View and Manage Your Categories."
    },
    "categories-id": {
      "title": "Category — {title}",
      "description": "Browse and Search by Product Category."
    },
    "users": {
      "title": "Users — Inventory",
      "description": "View the list of users."
    },
    "about-us": {
      "title": "About Us — Inventory",
      "description": "View information about the company."
    },
    "login": {
      "title": "Login — Inventory",
      "description": "User Login."
    },
    "register": {
      "title": "Registration — Inventory",
      "description": "Create a new account."
    },
    "verify": {
      "title": "Email Address Verification — Inventory",
      "description": "Email Address Confirmation to Complete Registration."
    },
    "settings": {
      "title": "Settings — Inventory",
      "description": "Manage your profile and application settings."
    }
  },
  ru: {
    "parishes": {
      "title": "Приходы — Inventory",
      "description": "Просмотр и управление списком приходов."
    },
    "groups": {
      "title": "Группы — Inventory",
      "description": "Просмотр и управление группами."
    },
    "parishes-id": {
      "title": "Приходы — {title}",
      "description": "Просмотр и управление товарами в приходе."
    },
    "products": {
      "title": "Продукты — Inventory",
      "description": "Просмотр и управление вашими продуктами."
    },
    "categories": {
      "title": "Категории — Inventory",
      "description": "Просмотр и управление категориями."
    },
    "categories-id": {
      "title": "Категория — {title}",
      "description": "Просмотр и поиск по категориям товаров."
    },
    "users": {
      "title": "Пользователи — Inventory",
      "description": "Просмотр списка пользователей."
    },
    "about-us": {
      "title": "О нас — Inventory",
      "description": "Просмотр информации о компании."
    },
    "login": {
      "title": "Вход пользователя — Inventory",
      "description": "Вход пользователя."
    },
    "register": {
      "title": "Регистрация — Inventory",
      "description": "Создание нового аккаунта."
    },
    "verify": {
      "title": "Подтверждение почты — Inventory",
      "description": "Подтверждение адреса электронной почты для завершения регистрации."
    },
    "settings": {
      "title": "Настройки — Inventory",
      "description": "Управление настройками профиля и приложения."
    }
  }
};

function replaceParams(title: string, params?: Record<string, string>): string {
  if (!params) return title;

  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, value);
  }, title);
}
export function generatePageMetadata({
  locale,
  key,
  titleParams,
}: GeneratePageMetadataOptions): PageMetadata {
  const metadata = MetadataStore[locale]?.[key];

  if (!metadata) {
    return {
      title: "Inventory",
      description: "Inventory Management System",
    };
  }

  return {
    title: replaceParams(metadata.title, titleParams),
    description: metadata.description,
  };
}