<!-- BEGIN:nextjs-agent-rules -->
## Project Overview
Computer equipment rental project - tracking available equipment to determine its current status, whether it is currently in service, when the requester received the equipment and is due to return it.

## 📦 Setup & Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint -- --fix`
- Database: `npm run db:studio` (Prisma Studio)

##  Boundaries (Правила поведения)
### Always do
- Запускай тесты перед созданием PR

### Git Commit Format (ОБЯЗАТЕЛЬНО!)
Когда пользователь просит вывести git commit команды, **ВСЕГДА** используй этот формат:

```bash
git add src/entities/verify/lib/create-verification-code.ts
git add src/entities/verify/lib/server.ts
git add src/entities/verify/server.ts
git add src/entities/verify/model/
git commit -m "feat(entities): add email verification token validation

- Add validateVerificationToken function to check token validity
- Validate token existence and expiration date
- Export TokenExpiredError and TokenNotFoundError from model
- Add proper error handling for verification flow"
```

**Правила:**
- Каждый `git add` на отдельной строке
- Пути относительные от корня проекта (src/...)
- Commit message с пустой строкой перед bullet points
- Группируй файлы по логическим коммитам
- НЕ добавляй комментарии с полными Windows путями
- НЕ оборачивай в cat << 'EOF'
- Просто выводи команды которые можно скопировать и выполнить

## Project Structure (Actual - Inventory Project)

**Domain:** Computer Equipment Inventory & Rental System
**Tech:** Next.js 16 + React 19 + TypeScript + Prisma (PostgreSQL) + next-intl (en/ru)

**Root:**
```
D:\Site\inventory/
├── src/                     # Source code (FSD architecture)
├── prisma/                  # Database schema & migrations
├── public/                  # Static assets
├── package.json             # Dependencies & scripts
└── AGENTS.md                # This file
```

**src/ (Feature-Sliced Design):**
```
src/
├── app/[locale]/            # 🔵 Next.js App Router + i18n
│   ├── auth/                # Login/Register page
│   ├── verify/              # Email verification page
│   ├── categories/[id]/     # Categories CRUD
│   ├── parishes/[id]/       # Parishes CRUD
│   ├── products/[id]/       # Products CRUD + rental tracking
│   ├── users/               # Users management
│   └── api/                 # API routes (auth, CRUD, upload, translate)
│
├── entities/                # 🟣 Business Entities
│   ├── category/            # api, lib, model, ui
│   ├── parish/              # api, lib, model, ui
│   ├── product/             # api, lib, model, ui
│   ├── user/                # api, lib, model, ui
│   ├── email/               # Email sending (verification)
│   ├── upload/              # Cloudinary file upload
│   └── verify/              # Token validation, error classes
│
├── features/                # 🟠 User Features
│   ├── auth/                # Login, register, logout
│   ├── verify-email/        # Email verification views
│   ├── add-category/        # Add category modal
│   ├── add-parish/          # Add parish modal
│   ├── add-product/         # Add product modal
│   ├── delete-resource/     # Generic delete modal
│   ├── header-search/       # Global search
│   ├── products-explore/    # Product filtering
│   └── view-product-details/
│
├── widgets/                 # 🟡 Page Compositions
│   ├── header/              # Top navigation
│   ├── sidebar/             # Side navigation
│   ├── page-header/         # Page title component
│   ├── auth-gate/           # Protected route wrapper
│   ├── verify-email-status/ # Verification status widget
│   ├── categories-list/     # Categories table
│   ├── parishes-list/       # Parishes table
│   ├── products-list/       # Products table
│   ├── users-list/          # Users table
│   ├── category-chart/      # Statistics chart
│   └── map/                 # Leaflet map (parishes locations)
│
├── shared/                  # ⚪ Shared Infrastructure
│   ├── ui/                  # shadcn/ui components + custom
│   │   ├── modal/           # Modal system
│   │   ├── button.tsx
│   │   ├── action-buttons.tsx  # SubmitButton, CancelButton
│   │   └── language-switcher.tsx
│   ├── lib/
│   │   ├── auth/            # JWT utilities
│   │   ├── axios/           # HTTP client
│   │   ├── i18n/            # Internationalization (en, ru)
│   │   │   └── locales/     # Translation JSON files
│   │   ├── hooks/           # Shared hooks
│   │   └── utils.ts
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── error-codes.ts
│   │   └── query-params-keys.ts
│   └── types/
│
└── middleware.ts            # Auth + i18n middleware
```

**Key Features:**
- Equipment rental tracking (status, assignment, return dates)
- Multi-parish management with geolocation
- Email verification for new users
- i18n support (English, Russian)
- File uploads to Cloudinary
- JWT authentication

**FSD Layer Rules:**
- **app/** - only routing, layouts, server components
- **entities/** - business logic, no cross-entity dependencies
- **features/** - can use entities, no feature-to-feature imports
- **widgets/** - compose features + entities
- **shared/** - no imports from upper layers

<!-- END:nextjs-agent-rules -->
