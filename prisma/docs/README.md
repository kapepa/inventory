# Database Schema Documentation

## Overview

This document describes the complete database schema for the **Inventory Management System**. The schema is designed using PostgreSQL and managed via Prisma ORM.

## 📂 Files in this Directory

- **`inventory-schema.mwb`** - MySQL Workbench visual schema file
- **`erd-diagram.png`** - Exported Entity-Relationship Diagram (if available)
- **`README.md`** - This file

## 🔧 How to View the Schema

### Option 1: MySQL Workbench (Visual)
1. Install [MySQL Workbench](https://www.mysql.com/products/workbench/)
2. Open `inventory-schema.mwb` file
3. View the visual ERD diagram

### Option 2: Prisma Schema (Code)
View the source schema at: `../schema.prisma`

## 📊 Database Tables

### 1. **Users** (`users`)

Stores user account information with role-based access control.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | String | User's full name |
| `email` | String | Unique email address |
| `password` | String | Hashed password (bcrypt) |
| `role` | Enum | USER or ADMIN |
| `verified_at` | DateTime | Email verification timestamp |
| `image_url` | String | Avatar image URL (Cloudinary) |
| `created_at` | DateTime | Account creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

**Relationships:**
- One-to-Many with `VerificationCode`
- Many-to-Many with `Parish` (via `UserParish`)
- One-to-Many with `Product`

---

### 2. **Verification Codes** (`verification_codes`)

Email verification codes for user registration.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `token` | String | Unique verification token |
| `email` | String | User's email address |
| `code` | String | 4-digit verification code |
| `user_id` | UUID | Foreign key to User (nullable) |
| `expires_at` | DateTime | Code expiration time |
| `created_at` | DateTime | Creation timestamp |
| `used_at` | DateTime | Usage timestamp (nullable) |

**Indexes:**
- `email` (indexed)
- `token` (indexed, unique)

**Relationships:**
- Many-to-One with `User`

---

### 3. **Parishes** (`parishes`)

Organizational units or locations (e.g., church parishes, branches).

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `delivery_date` | DateTime | Expected delivery date (nullable) |
| `created_at` | DateTime | Creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

**Relationships:**
- Many-to-Many with `User` (via `UserParish`)
- One-to-Many with `Product`
- One-to-Many with `ParishTranslation`

---

### 4. **User-Parish Junction** (`user_parishes`)

Many-to-many relationship between Users and Parishes.

| Column | Type | Description |
|--------|------|-------------|
| `user_id` | UUID | Foreign key to User |
| `parish_id` | UUID | Foreign key to Parish |

**Composite Primary Key:** (`user_id`, `parish_id`)

---

### 5. **Parish Translations** (`parish_translations`)

Multi-language support for parish names and descriptions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `parish_id` | UUID | Foreign key to Parish |
| `locale` | String | Language code (en, ru) |
| `title` | String | Parish name |
| `description` | String | Parish description (nullable) |

**Unique Constraint:** (`parish_id`, `locale`)

**Relationships:**
- Many-to-One with `Parish`

---

### 6. **Categories** (`categories`)

Product categories for organization.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `created_at` | DateTime | Creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

**Relationships:**
- One-to-Many with `Product`
- One-to-Many with `CategoryTranslation`

---

### 7. **Category Translations** (`category_translations`)

Multi-language support for category names.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `category_id` | UUID | Foreign key to Category |
| `locale` | String | Language code (en, ru) |
| `title` | String | Category name |

**Unique Constraint:** (`category_id`, `locale`)

**Relationships:**
- Many-to-One with `Category`

---

### 8. **Products** (`products`)

Inventory items with full specifications.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `serial_number` | String | Unique product identifier |
| `is_new` | Boolean | Condition (new/used) |
| `status` | Enum | FREE, BUSY, REPAIR |
| `photo` | String | Product image URL (Cloudinary) |
| `order` | Integer | Display order (nullable) |
| `category_id` | UUID | Foreign key to Category |
| `parish_id` | UUID | Foreign key to Parish |
| `user_id` | UUID | Foreign key to User (nullable) |
| `created_at` | DateTime | Creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

**Unique Constraint:** `serial_number`

**Relationships:**
- Many-to-One with `Category`
- Many-to-One with `Parish`
- Many-to-One with `User`
- One-to-One with `Rental`
- One-to-Many with `Price`
- One-to-Many with `ProductTranslation`

---

### 9. **Product Translations** (`product_translations`)

Multi-language support for product details.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `product_id` | UUID | Foreign key to Product |
| `locale` | String | Language code (en, ru) |
| `title` | String | Product name |
| `specification` | String | Product specifications (nullable) |

**Unique Constraint:** (`product_id`, `locale`)

**Relationships:**
- Many-to-One with `Product`

---

### 10. **Rentals** (`rentals`)

Product rental tracking.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `product_id` | UUID | Foreign key to Product (unique) |
| `start_date` | DateTime | Rental start date |
| `end_date` | DateTime | Rental end date |
| `created_at` | DateTime | Creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

**Relationships:**
- One-to-One with `Product`

---

### 11. **Prices** (`prices`)

Multi-currency pricing for products.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `product_id` | UUID | Foreign key to Product |
| `value` | Float | Price amount |
| `symbol` | Enum | UAH or USD |
| `created_at` | DateTime | Creation timestamp |
| `updated_at` | DateTime | Last update timestamp |

**Unique Constraint:** (`product_id`, `symbol`)

**Relationships:**
- Many-to-One with `Product`

---

## 🔐 Enums

### **Role**
- `USER` - Regular user with read-only access
- `ADMIN` - Administrator with full CRUD permissions

### **Money**
- `UAH` - Ukrainian Hryvnia
- `USD` - US Dollar

### **ProductStatus**
- `FREE` - Available for use
- `BUSY` - Currently in use
- `REPAIR` - Under maintenance

---

## 🔗 Key Relationships

```
User ──┬─→ VerificationCode (1:N)
       ├─→ UserParish (M:N) ─→ Parish
       └─→ Product (1:N)

Parish ──┬─→ ParishTranslation (1:N)
         ├─→ Product (1:N)
         └─→ UserParish (M:N) ─→ User

Category ──┬─→ CategoryTranslation (1:N)
           └─→ Product (1:N)

Product ──┬─→ ProductTranslation (1:N)
          ├─→ Price (1:N)
          ├─→ Rental (1:1)
          ├─→ Category (N:1)
          ├─→ Parish (N:1)
          └─→ User (N:1)
```

---

## 🌍 Internationalization (i18n)

The database supports **English (en)** and **Russian (ru)** through translation tables:

- `parish_translations` - Parish names and descriptions
- `category_translations` - Category names
- `product_translations` - Product titles and specifications

Each translation is uniquely identified by `(entity_id, locale)`.

---

## 🔒 Security Features

1. **Password Hashing**: User passwords are hashed using bcrypt
2. **Email Verification**: 4-digit codes with expiration
3. **JWT Authentication**: Token-based auth system
4. **Role-Based Access**: USER vs ADMIN permissions
5. **Cascade Deletes**: Automatic cleanup of related records

---

## ✅ Validation Rules

The application enforces validation rules at the **application level** (server + client) using the constants defined in `src/shared/constants/validation.ts`. These rules are **NOT enforced at the database level**, so be aware when testing directly with the database.

### User Fields

| Field | Min Length | Max Length | Notes |
|-------|------------|------------|-------|
| `name` | 2 | 100 | User's full name |
| `email` | 6 | 254 | Must be valid email format |
| `password` | 8 | 128 | Hashed in database (bcrypt) |

### Parish Fields

| Field | Min Length | Max Length | Notes |
|-------|------------|------------|-------|
| `title` | 2 | 100 | Parish name (per locale) |
| `description` | 3 | 400 | Optional description (per locale) |

### Category Fields

| Field | Min Length | Max Length | Notes |
|-------|------------|------------|-------|
| `title` | 2 | 100 | Category name (per locale) |

### Product Fields

| Field | Min Length | Max Length | Notes |
|-------|------------|------------|-------|
| `title` | 2 | 100 | Product name (per locale) |
| `specification` | 3 | 400 | Product specs (per locale) |
| `serial_number` | 3 | 50 | Unique identifier |
| `order` | - | 999,999,999 | Display order (integer) |
| `photo` | - | 1024 | Cloudinary URL |

### Price Fields

| Field | Min Value | Max Value | Notes |
|-------|-----------|-----------|-------|
| `value` | 0 | 999,999,999 | Price amount (float) |

### Verification Fields

| Field | Length | Notes |
|-------|--------|-------|
| `code` | 4 | 4-digit verification code |
| `token` | 1-100 | Unique verification token |
| `locale` | 2 | Language code (en, ru) |

### Important Notes for Testers

⚠️ **These validations are enforced ONLY in the application code**, not at the database level:

1. **Direct DB inserts** can bypass these limits
2. **Test via API endpoints** to validate these rules properly
3. **Client-side validation** uses the same constants for UX
4. **Server-side validation** prevents invalid data from reaching the database

**Example:** If you insert a product with `serial_number = "ab"` (2 chars) directly in the database, it will succeed. But the API will reject it because min length is 3.

---

## 📝 Notes

- All tables use UUID as primary keys for better scalability
- Timestamps (`created_at`, `updated_at`) are automatically managed by Prisma
- Soft deletes are NOT implemented (hard deletes only)
- Database uses PostgreSQL with connection pooling

---

## 🔄 Schema Updates

To update the schema:

1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description`
3. Update this documentation
4. Update `inventory-schema.mwb` in MySQL Workbench
5. Export new ERD diagram

---

## 📞 Contact

For questions about the database schema, contact the development team.

**Last Updated:** 2026-08-21
