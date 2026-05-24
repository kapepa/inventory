<!-- BEGIN:nextjs-agent-rules -->
## Project Overview
  Computer equipment rental project
  Tracking available equipment to determine its current status and whether it is currently in service, as well as when the requester received the equipment and is due to return it

## 📦 Setup & Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint -- --fix`

##  Boundaries (Правила поведения)
### Always do
- Запускай тесты перед созданием PR
<!-- - Исправляй ошибки линтера -->

<!-- ## Testing
- Фреймворк: Vitest/Jest
- Запустить все тесты: `npm run test`
- Только юнит-тесты: `npm run test:unit`
- Покрытие: `npm run test:coverage` -->

## Project Structure
src/
├── app/                     # 🔵 Next.js routing layer (App Router)
│   ├── (routes)/            # Route group (doesn't affect URL)
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── about/
│   │       └── page.tsx
│   ├── globals.css
│   └── providers.tsx
│
├── pages/                   # 🟢 Page composition (FSD)
│   └── home/
│       ├── index.ts
│       └── ui/
│           └── home-page.tsx
│
├── widgets/                 # 🟡 Large UI blocks
│   ├── header/
│   │   ├── index.ts
│   │   ├── ui/
│   │   │   └── header.tsx
│   │   └── model/
│   │       └── use-header.ts
│   └── footer/
│
├── features/                # 🟠 User scenarios
│   ├── add-to-cart/
│   │   ├── index.ts
│   │   ├── ui/
│   │   │   └── add-to-cart-button.tsx
│   │   └── model/
│   │       └── use-add-to-cart.ts
│   └── auth/
│
├── entities/                # 🟣 Business entities
│   ├── product/
│   │   ├── index.ts
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── ui/
│   │       └── product-card.tsx
│   └── user/
│
└── shared/                  # ⚪ Reusable infrastructure
    ├── ui/                  # UI-kit (Button, Input, Modal)
    ├── lib/                 # Utilities (cn, formatDate)
    ├── api/                 # HTTP client
    ├── hooks/               # useDebounce, useLocalStorage
    └── config/              # Constants, env

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
