-- ========================================
-- Inventory Management System - Database Schema
-- Generated from Prisma Schema
-- PostgreSQL Compatible
-- Last Updated: 2026-08-21
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- ENUMS
-- ========================================

CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "Money" AS ENUM ('UAH', 'USD');
CREATE TYPE "ProductStatus" AS ENUM ('FREE', 'BUSY', 'REPAIR');

-- ========================================
-- TABLES
-- ========================================

-- Users Table
CREATE TABLE "users" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(100) NOT NULL CHECK (LENGTH("name") >= 2),
    "email" VARCHAR(254) UNIQUE NOT NULL CHECK (LENGTH("email") >= 6),
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" DEFAULT 'USER' NOT NULL,
    "verified_at" TIMESTAMP,
    "image_url" VARCHAR(1024),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

COMMENT ON COLUMN "users"."name" IS 'Min: 2, Max: 100 chars';
COMMENT ON COLUMN "users"."email" IS 'Min: 6, Max: 254 chars';
COMMENT ON COLUMN "users"."password" IS 'Hashed with bcrypt, original min: 8, max: 128 chars';
COMMENT ON COLUMN "users"."image_url" IS 'Cloudinary URL, max: 1024 chars';

-- Verification Codes Table
CREATE TABLE "verification_codes" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "token" VARCHAR(100) UNIQUE NOT NULL CHECK (LENGTH("token") >= 1),
    "email" VARCHAR(254) NOT NULL,
    "code" CHAR(4) NOT NULL,
    "user_id" UUID,
    "expires_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "used_at" TIMESTAMP
);

CREATE INDEX "idx_verification_codes_email" ON "verification_codes"("email");
CREATE INDEX "idx_verification_codes_token" ON "verification_codes"("token");

COMMENT ON COLUMN "verification_codes"."code" IS 'Exactly 4 digits';
COMMENT ON COLUMN "verification_codes"."token" IS 'Min: 1, Max: 100 chars';

-- Parishes Table
CREATE TABLE "parishes" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "delivery_date" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- User-Parish Junction Table
CREATE TABLE "user_parishes" (
    "user_id" UUID NOT NULL,
    "parish_id" UUID NOT NULL,
    PRIMARY KEY ("user_id", "parish_id")
);

-- Parish Translations Table
CREATE TABLE "parish_translations" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "parish_id" UUID NOT NULL,
    "locale" CHAR(2) NOT NULL CHECK ("locale" IN ('en', 'ru')),
    "title" VARCHAR(100) NOT NULL CHECK (LENGTH("title") >= 2),
    "description" VARCHAR(400) CHECK (LENGTH("description") >= 3 OR "description" IS NULL),
    UNIQUE ("parish_id", "locale")
);

COMMENT ON COLUMN "parish_translations"."title" IS 'Min: 2, Max: 100 chars';
COMMENT ON COLUMN "parish_translations"."description" IS 'Min: 3, Max: 400 chars (optional)';
COMMENT ON COLUMN "parish_translations"."locale" IS 'Must be "en" or "ru"';

-- Categories Table
CREATE TABLE "categories" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Category Translations Table
CREATE TABLE "category_translations" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "category_id" UUID NOT NULL,
    "locale" CHAR(2) NOT NULL CHECK ("locale" IN ('en', 'ru')),
    "title" VARCHAR(100) NOT NULL CHECK (LENGTH("title") >= 2),
    UNIQUE ("category_id", "locale")
);

COMMENT ON COLUMN "category_translations"."title" IS 'Min: 2, Max: 100 chars';
COMMENT ON COLUMN "category_translations"."locale" IS 'Must be "en" or "ru"';

-- Products Table
CREATE TABLE "products" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "serial_number" VARCHAR(50) UNIQUE NOT NULL CHECK (LENGTH("serial_number") >= 3),
    "is_new" BOOLEAN DEFAULT true NOT NULL,
    "status" "ProductStatus" DEFAULT 'FREE' NOT NULL,
    "photo" VARCHAR(1024),
    "order" INTEGER CHECK ("order" <= 999999999),
    "category_id" UUID,
    "parish_id" UUID,
    "user_id" UUID,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX "idx_products_serial_number" ON "products"("serial_number");
CREATE INDEX "idx_products_category_id" ON "products"("category_id");
CREATE INDEX "idx_products_parish_id" ON "products"("parish_id");
CREATE INDEX "idx_products_user_id" ON "products"("user_id");

COMMENT ON COLUMN "products"."serial_number" IS 'Min: 3, Max: 50 chars, must be unique';
COMMENT ON COLUMN "products"."photo" IS 'Cloudinary URL, max: 1024 chars';
COMMENT ON COLUMN "products"."order" IS 'Display order, max: 999,999,999';

-- Product Translations Table
CREATE TABLE "product_translations" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "locale" CHAR(2) NOT NULL CHECK ("locale" IN ('en', 'ru')),
    "title" VARCHAR(100) NOT NULL CHECK (LENGTH("title") >= 2),
    "specification" VARCHAR(400) CHECK (LENGTH("specification") >= 3 OR "specification" IS NULL),
    UNIQUE ("product_id", "locale")
);

COMMENT ON COLUMN "product_translations"."title" IS 'Min: 2, Max: 100 chars';
COMMENT ON COLUMN "product_translations"."specification" IS 'Min: 3, Max: 400 chars (optional)';
COMMENT ON COLUMN "product_translations"."locale" IS 'Must be "en" or "ru"';

-- Rentals Table
CREATE TABLE "rentals" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "product_id" UUID UNIQUE NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CHECK ("end_date" > "start_date")
);

COMMENT ON TABLE "rentals" IS 'Product rental periods, end_date must be after start_date';

-- Prices Table
CREATE TABLE "prices" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "value" DOUBLE PRECISION NOT NULL CHECK ("value" >= 0 AND "value" <= 999999999),
    "symbol" "Money" DEFAULT 'UAH' NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE ("product_id", "symbol")
);

COMMENT ON COLUMN "prices"."value" IS 'Min: 0, Max: 999,999,999';

-- ========================================
-- FOREIGN KEYS
-- ========================================

-- Verification Codes → Users
ALTER TABLE "verification_codes"
    ADD CONSTRAINT "fk_verification_codes_user"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE;

-- User Parishes → Users
ALTER TABLE "user_parishes"
    ADD CONSTRAINT "fk_user_parishes_user"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE;

-- User Parishes → Parishes
ALTER TABLE "user_parishes"
    ADD CONSTRAINT "fk_user_parishes_parish"
    FOREIGN KEY ("parish_id") REFERENCES "parishes"("id")
    ON DELETE CASCADE;

-- Parish Translations → Parishes
ALTER TABLE "parish_translations"
    ADD CONSTRAINT "fk_parish_translations_parish"
    FOREIGN KEY ("parish_id") REFERENCES "parishes"("id")
    ON DELETE CASCADE;

-- Category Translations → Categories
ALTER TABLE "category_translations"
    ADD CONSTRAINT "fk_category_translations_category"
    FOREIGN KEY ("category_id") REFERENCES "categories"("id")
    ON DELETE CASCADE;

-- Products → Categories
ALTER TABLE "products"
    ADD CONSTRAINT "fk_products_category"
    FOREIGN KEY ("category_id") REFERENCES "categories"("id")
    ON DELETE SET NULL;

-- Products → Parishes
ALTER TABLE "products"
    ADD CONSTRAINT "fk_products_parish"
    FOREIGN KEY ("parish_id") REFERENCES "parishes"("id")
    ON DELETE SET NULL;

-- Products → Users
ALTER TABLE "products"
    ADD CONSTRAINT "fk_products_user"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE SET NULL;

-- Product Translations → Products
ALTER TABLE "product_translations"
    ADD CONSTRAINT "fk_product_translations_product"
    FOREIGN KEY ("product_id") REFERENCES "products"("id")
    ON DELETE CASCADE;

-- Rentals → Products
ALTER TABLE "rentals"
    ADD CONSTRAINT "fk_rentals_product"
    FOREIGN KEY ("product_id") REFERENCES "products"("id")
    ON DELETE CASCADE;

-- Prices → Products
ALTER TABLE "prices"
    ADD CONSTRAINT "fk_prices_product"
    FOREIGN KEY ("product_id") REFERENCES "products"("id")
    ON DELETE CASCADE;

-- ========================================
-- VALIDATION CONSTRAINTS SUMMARY
-- ========================================

/*
These constraints match the validation rules in src/shared/constants/validation.ts:

USERS:
- name: 2-100 chars
- email: 6-254 chars
- password: 8-128 chars (before hashing)

PARISHES:
- title: 2-100 chars
- description: 3-400 chars (optional)

CATEGORIES:
- title: 2-100 chars

PRODUCTS:
- title: 2-100 chars
- specification: 3-400 chars (optional)
- serial_number: 3-50 chars (unique)
- order: max 999,999,999
- photo: max 1024 chars (Cloudinary URL)

PRICES:
- value: 0 to 999,999,999

VERIFICATION:
- code: exactly 4 chars
- token: 1-100 chars
- locale: 2 chars (en, ru)

NOTE: Application-level validations in validation.ts provide additional checks
that are NOT enforced at the database level (e.g., email format, password strength).
*/

-- ========================================
-- END OF SCHEMA
-- ========================================
