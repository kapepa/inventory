# Inventory Management System

A comprehensive full-stack inventory management application built with Next.js 16, TypeScript, Prisma, PostgreSQL, and modern web technologies. The system provides multi-language support (English/Russian), real-time updates via WebSockets, and role-based access control.

## 🌐 Live Demo

The application is deployed and available at:

- **Production (Main)**: https://inventory-weld-sigma.vercel.app
  - ⚡ Optimized for speed with edge network and CDN
  - ⚠️ **Note:** WebSocket connections are not supported on Vercel (real-time features disabled)
  
- **Production (Backup)**: https://inventory-xl6e.onrender.com
  - ✅ Full feature support including WebSocket real-time updates
  - 🐢 Slower initial load due to cold starts (free tier)
  - 💤 **Server sleeps after 15 minutes of inactivity**
  
  **How to wake up Render:**
  1. Open the URL in your browser
  2. Wait 30-60 seconds for the server to wake up
  3. Press `Ctrl+F5` (hard refresh) to reload the page
  4. The site will be active and fast for the next 15 minutes

> **Note:** For testing real-time features (Socket.IO), use the Render deployment. For the best performance without real-time features, use Vercel.

## 🚀 Features

### Core Functionality

- **Product Management**
  - Create, read, update, and delete products with serial numbers
  - Product status tracking (FREE, BUSY, REPAIR)
  - Product condition tracking (new/used)
  - Multi-language product descriptions (English/Russian)
  - Image upload via Cloudinary integration
  - Product pricing in multiple currencies (UAH, USD)
  - Product rental management with start/end dates
  - Product search and filtering

- **Parish Management**
  - Create and manage parishes (organizational units)
  - Multi-language parish descriptions
  - Track delivery dates
  - Associate users and products with parishes
  - Parish-specific product inventory
  - Total statistics per parish

- **Category Management**
  - Organize products by categories
  - Multi-language category names
  - Category-wise product count
  - Category-based filtering and browsing

- **User Management**
  - User registration with email verification
  - Secure authentication (JWT-based)
  - Multi-parish user assignment
  - Profile management with avatar upload
  - Password change functionality
  
  **Role-Based Access Control (RBAC):**
  
  **USER Role:**
  - View products, parishes, and categories
  - Search and filter inventory
  - View product details and specifications
  - Access to assigned parishes only
  - Read-only access to most features
  
  **ADMIN Role:**
  - All USER permissions, plus:
  - **Create** parishes, categories, and products
  - **Update** parishes, categories, and products
  - **Delete** parishes, categories, and products
  - Access to restricted admin pages (category management, user management)
  - Full access to all parishes
  - Manage user roles and permissions
  
  **Email Notification System:**
  - **Registration Email**: 4-digit verification code sent upon sign-up
  - **Verification Success Email**: Confirmation email after successful account verification
  - **Password Change Email**: Security notification when password is updated
  - All emails support English and Russian languages
  - Powered by Nodemailer with Gmail OAuth integration

- **Advanced Features**
  - **Progressive Web App (PWA)**: Full offline support with Service Worker
    - Installable on mobile and desktop devices
    - Works offline with cached pages and resources
    - Custom offline page with network status detection
    - Automatic cache management with TTL (5 minutes for pages)
    - Multi-language manifest files (English/Russian)
    - Cache strategies:
      - **HTML pages**: Network First with 5-minute cache TTL
      - **Static assets** (JS, CSS, fonts): Cache First with background updates
      - **Images** (Cloudinary): Cache First for offline access
      - **API requests**: Network Only (no offline caching for data integrity)
  
  - **Service Worker Features**:
    - Automatic service worker registration on app load
    - Intelligent caching with version management (v3)
    - Three cache stores: static, pages, and images
    - Offline fallback page with connection retry
    - Background prefetching of critical resources
    - Automatic cleanup of old cache versions
  
  - **Real-time Updates**: WebSocket integration (Socket.IO) for live data synchronization
  - **Internationalization**: Full i18n support for English and Russian
  - **Dark/Light Mode**: Theme switching capability
  - **Responsive Design**: Mobile-friendly UI with Tailwind CSS
  - **Email Notifications**: Automated email system for:
    - Registration verification codes (4-digit)
    - Successful verification confirmations
    - Password change security alerts
    - Multi-language support (EN/RU)
  - **Image Management**: Cloudinary integration for product and user photos
  - **Translation API**: Built-in translation endpoint for dynamic content

### Technical Features

- **Modern Stack**: Next.js 16 with App Router, React 19, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.IO for WebSocket connections
- **UI Components**: Radix UI primitives with shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with CSS modules support
- **State Management**: Zustand for global state
- **Testing Framework**: Comprehensive testing setup
  - **Unit Tests**: Vitest with React Testing Library
    - Fast test execution with HMR support
    - Coverage reports with @vitest/coverage-v8
    - UI mode for interactive test debugging
    - Watch mode for development
  - **E2E Tests**: Playwright for end-to-end testing
    - Cross-browser testing (Chromium, Firefox, WebKit)
    - Headed/headless mode support
    - Interactive UI mode for debugging
    - Test report generation
    - Code generation tool for creating tests
    - Separate test database (PostgreSQL on port 5433)
    - Automated test setup and teardown scripts
- **DevOps & CI/CD**: 
  - Docker Compose for containerized development
  - Automated deployment pipelines
  - **Vercel Deployment**: Main production environment with automatic deployments from `main` branch
  - **Render Deployment**: Backup production environment with continuous deployment
  - Git-based workflow with automated builds and previews

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** (v9 or higher)
- **Docker** and **Docker Compose** (for containerized setup)
- **PostgreSQL** (v16 or higher, if running locally without Docker)
- **Git**

## 🛠️ Installation & Setup

### Option 1: Local Development (Without Docker)

1. **Clone the repository**
```bash
# SSH (recommended if you have SSH keys set up)
git clone git@github.com:kapepa/inventory.git

# HTTPS (works without SSH keys)
git clone https://github.com/kapepa/inventory.git

cd inventory
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (adjust for your local PostgreSQL)
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory?sslmode=disable

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (generate a random string)
JWT_SECRET=your_secure_random_string

# Email Configuration (Gmail OAuth)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_EMAIL=your_email@gmail.com
MAIL_FROM=Inventory <your_email@gmail.com>
```

4. **Set up the database**

Make sure PostgreSQL is running locally, then:

```bash
# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed
```

5. **Run the development server**
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Option 2: Docker Development (Recommended)

1. **Clone the repository**
```bash
# SSH (recommended if you have SSH keys set up)
git clone git@github.com:kapepa/inventory.git

# HTTPS (works without SSH keys)
git clone https://github.com/kapepa/inventory.git

cd inventory
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory (you should receive this file from your team):

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_SECRET=your_secure_random_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_EMAIL=your_email@gmail.com
MAIL_FROM=Inventory <your_email@gmail.com>
```

> **Note:** Docker uses its own `DATABASE_URL` from `docker-compose.yml` and will automatically run migrations on startup.

4. **Start the application with Docker**

```bash
# Recommended: Start app (PostgreSQL starts automatically via depends_on)
npm run dev:docker

# Alternative: Explicitly start all services
npm run dev:all
```

**Difference between commands:**
- `npm run dev:docker` - Starts only the app container. PostgreSQL starts automatically due to `depends_on` configuration.
- `npm run dev:all` - Explicitly starts all services defined in the `dev` profile.

Both commands achieve the same result, but `dev:docker` is more explicit about starting the app as the primary service.

The application will be available at [http://localhost:3000](http://localhost:3000)

**First-time setup:** Docker will automatically:
- Pull the required images (Node.js, PostgreSQL)
- Install dependencies inside the container
- Run database migrations
- Start the development server

This may take a few minutes on the first run.

5. **Stop the Docker containers**
```bash
npm run dev:docker:stop
```

This command stops both the app and PostgreSQL containers.

### Option 3: Production Deployment

#### Manual Deployment

1. **Build the application**
```bash
npm run build
```

2. **Start the production server**
```bash
npm run start
```

Or use Docker:
```bash
docker-compose --profile prod up -d
```

#### CI/CD Automated Deployment

The application uses automated CI/CD pipelines for seamless deployment:

**Vercel (Main Production)**
- **Automatic deployments** on push to `main` branch
- **Preview deployments** for pull requests
- **Environment**: [https://inventory-weld-sigma.vercel.app](https://inventory-weld-sigma.vercel.app)
- **Features**: 
  - Zero-downtime deployments
  - Automatic HTTPS and CDN
  - Edge network optimization
  - Built-in analytics

**Render (Backup Production)**
- **Continuous deployment** from GitHub
- **Environment**: [https://inventory-xl6e.onrender.com](https://inventory-xl6e.onrender.com)
- **Features**:
  - Automatic SSL certificates
  - Managed PostgreSQL database
  - Auto-scaling capabilities
  - Health checks and monitoring

**Deployment Workflow:**
1. Push code to `main` branch
2. Automated tests run (optional)
3. Build process starts automatically
4. Application deploys to both platforms
5. Database migrations run automatically
6. Zero-downtime rollout

> **Note:** Both environments use separate PostgreSQL databases (Neon for Vercel, Render PostgreSQL for Render).

## 📦 Available Commands

### Development

```bash
npm run dev                    # Start development server (local)
npm run dev:docker            # Start development server (Docker)
npm run dev:all               # Start all Docker services
npm run dev:docker:stop       # Stop Docker development services
```

### Building

```bash
npm run build                 # Build production bundle
npm run build:clean           # Clean .next folder
npm run build:rebuild         # Clean and rebuild
npm run analyze               # Analyze bundle size
npm run start                 # Start production server (local)
npm run start:prod            # Start production server with NODE_ENV=production
```

### Database Management

```bash
npm run db:setup              # Complete database setup (Docker)
npm run db:generate           # Generate Prisma Client
npm run db:migrate            # Run database migrations (local)
npm run db:migrate:docker     # Run database migrations (Docker)
npm run db:seed               # Seed database with initial data (local)
npm run db:seed:docker        # Seed database with initial data (Docker)
npm run db:studio             # Open Prisma Studio (local)
npm run db:studio:docker      # Open Prisma Studio (Docker)
npm run db:push               # Push schema changes without migration (local)
npm run db:push:docker        # Push schema changes without migration (Docker)
npm run db:reset              # Reset database (local)
npm run db:reset:docker       # Reset database (Docker)
```

### Docker Management

```bash
npm run docker:up             # Start all Docker containers
npm run docker:down           # Stop all Docker containers
npm run docker:clean          # Stop containers and remove volumes/images
npm run docker:logs           # View all container logs
npm run docker:logs:app       # View app container logs
npm run docker:logs:postgres  # View PostgreSQL container logs
npm run docker:restart        # Restart all containers
npm run docker:build          # Rebuild Docker images
```

### Testing

```bash
npm run test                  # Run unit tests
npm run test:ui               # Run unit tests with UI
npm run test:watch            # Run unit tests in watch mode
npm run test:coverage         # Run unit tests with coverage

npm run test:e2e              # Run E2E tests
npm run test:e2e:ui           # Run E2E tests with UI
npm run test:e2e:headed       # Run E2E tests in headed mode
npm run test:e2e:debug        # Debug E2E tests
npm run test:e2e:report       # Show E2E test report
npm run test:e2e:codegen      # Generate E2E test code

npm run test:db:up            # Start test database
npm run test:db:down          # Stop test database
npm run test:db:reset         # Reset test database
npm run test:setup            # Set up test environment
npm run test:teardown         # Tear down test environment
npm run test:full             # Run full test suite with setup/teardown
```

### Linting

```bash
npm run lint                  # Run ESLint
```

## 🗂️ Project Structure

### Architecture: Feature-Sliced Design (FSD)

This project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** - a modern architectural methodology for frontend applications that provides:

- **Clear separation of concerns** - Each layer has a specific responsibility
- **Scalability** - Easy to add new features without breaking existing code
- **Maintainability** - Predictable file structure and dependencies
- **Team collaboration** - Standardized architecture for consistent development
- **Modularity** - Independent, reusable modules with explicit dependencies

### FSD Layers Overview

The application is organized into the following FSD layers (from top to bottom):

1. **app** - Application layer (routing, providers, styles)
2. **widgets** - Complex UI blocks (sidebar, header, etc.)
3. **features** - User interactions and business features
4. **entities** - Business entities and domain logic
5. **shared** - Reusable infrastructure code

```
inventory/
├── prisma/
│   ├── schema.prisma         # Database schema (Prisma ORM)
│   └── seed.ts               # Database seed script
├── public/
│   └── images/               # Static images and assets
├── src/
│   ├── app/                  # 🔴 App Layer - Application entry point
│   │   ├── [locale]/         # Internationalized routes (i18n)
│   │   │   ├── (auth)/       # Protected routes (authenticated users)
│   │   │   │   ├── products/     # Products management pages
│   │   │   │   ├── parishes/     # Parishes management pages
│   │   │   │   ├── categories/   # Categories management pages
│   │   │   │   ├── users/        # Users management pages (admin)
│   │   │   │   ├── groups/       # Groups management pages
│   │   │   │   ├── settings/     # User settings page
│   │   │   │   └── about-us/     # About page
│   │   │   └── (public)/     # Public routes (unauthenticated)
│   │   │       ├── (auth)/   # Authentication pages
│   │   │       │   ├── login/    # Login page
│   │   │       │   └── register/ # Registration page
│   │   │       └── verify/   # Email verification page
│   │   └── api/              # API routes (Next.js API handlers)
│   │       ├── auth/         # Authentication endpoints
│   │       │   ├── login/
│   │       │   ├── register/
│   │       │   ├── logout/
│   │       │   ├── verify-email/
│   │       │   └── resend-verification/
│   │       ├── products/     # Product CRUD endpoints
│   │       ├── parishes/     # Parish CRUD endpoints
│   │       ├── categories/   # Category CRUD endpoints
│   │       ├── users/        # User management endpoints
│   │       ├── upload/       # File upload endpoint (Cloudinary)
│   │       └── translate/    # Translation API endpoint
│   │
│   ├── widgets/              # 🟠 Widgets Layer - Composite UI blocks
│   │   └── sidebar/          # Main sidebar navigation
│   │       └── ui/
│   │           └── sidebar.module.css
│   │
│   ├── features/             # 🟡 Features Layer - User scenarios
│   │   ├── add-product/      # Create/add product feature
│   │   │   └── api/
│   │   └── add-parish/       # Create/add parish feature
│   │       └── api/
│   │
│   ├── entities/             # 🟢 Entities Layer - Business entities
│   │   ├── category/         # Category entity
│   │   │   ├── api/          # API methods
│   │   │   └── model/
│   │   │       └── types/    # TypeScript types
│   │   ├── parish/           # Parish entity
│   │   │   ├── api/
│   │   │   └── model/
│   │   │       └── types/
│   │   ├── product/          # Product entity
│   │   │   ├── api/
│   │   │   └── model/
│   │   ├── upload/           # Upload/image entity
│   │   │   ├── api/
│   │   │   ├── config/       # Cloudinary configuration
│   │   │   ├── lib/
│   │   │   └── model/
│   │   ├── email/            # Email entity
│   │   │   └── config/       # Nodemailer transport config
│   │   └── user/             # User entity
│   │
│   ├── shared/               # 🔵 Shared Layer - Reusable infrastructure
│   │   ├── ui/               # Reusable UI components (buttons, inputs, etc.)
│   │   │   ├── skeleton.tsx
│   │   │   ├── container.tsx
│   │   │   ├── calendar.tsx
│   │   │   └── modal/
│   │   ├── lib/              # Utility functions and helpers
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   │   ├── use-debounce.ts
│   │   │   │   ├── use-throttle.ts
│   │   │   │   ├── use-mounted.ts
│   │   │   │   ├── use-intersection-observer.ts
│   │   │   │   └── use-active-parish-id.ts
│   │   │   ├── i18n/         # Internationalization setup
│   │   │   │   └── locales/
│   │   │   │       ├── en/   # English translations
│   │   │   │       └── ru/   # Russian translations
│   │   │   ├── currency/     # Currency formatting utilities
│   │   │   ├── utils.ts      # Common utilities (cn, clsx, etc.)
│   │   │   ├── get-condition-display.ts
│   │   │   ├── get-status-display.ts
│   │   │   ├── get-product-price.ts
│   │   │   └── image-guards.ts
│   │   └── constants/        # Application constants
│   │       └── breakpoints.ts
│   │
│   └── types/                # Global TypeScript type definitions
│       └── css-modules.d.ts
│
├── docker-compose.yml        # Docker Compose configuration
├── server.ts                 # Custom Node.js server (WebSocket support)
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── components.json           # shadcn/ui configuration
└── README.md                 # Project documentation
```

### FSD Layer Interaction Rules

- **app** can import from: widgets, features, entities, shared
- **widgets** can import from: features, entities, shared
- **features** can import from: entities, shared
- **entities** can import from: shared
- **shared** cannot import from other layers (self-contained)

This ensures unidirectional data flow and prevents circular dependencies.

## 🔑 Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts with roles (USER, ADMIN)
- **VerificationCodes**: Email verification codes
- **Parishes**: Organizational units/locations
- **UserParish**: Many-to-many relationship between users and parishes
- **ParishTranslation**: Multi-language parish data
- **Categories**: Product categories
- **CategoryTranslation**: Multi-language category names
- **Products**: Inventory items with serial numbers
- **ProductTranslation**: Multi-language product descriptions
- **Rentals**: Product rental tracking
- **Prices**: Product prices in multiple currencies

### 📚 Database Documentation

Complete database documentation is available in the `prisma/docs/` directory:

**Files:**
- **`README.md`** - Complete database schema documentation
  - All 11 tables with column descriptions
  - Data types and constraints
  - Relationships between tables
  - Enums (Role, Money, ProductStatus)
  - Validation rules (min/max lengths)
  - Security features
  - Internationalization (EN/RU)
  
- **`schema.sql`** - SQL schema export
  - PostgreSQL-compatible schema
  - All tables, indexes, and foreign keys
  - CHECK constraints for validation
  - Can be imported into MySQL Workbench or PostgreSQL
  - Synchronized with `schema.prisma` and `validation.ts`

**How to view:**
1. **Read documentation**: Open `prisma/docs/README.md`
2. **Import to Workbench**: Use `prisma/docs/schema.sql` in MySQL Workbench
3. **View Prisma schema**: Check `prisma/schema.prisma` (source of truth)

**For developers:**
```bash
# View Prisma Studio (visual database editor)
npm run db:studio

# Generate ERD diagram
npx prisma generate
npx prisma studio
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-email` - Verify email with code
- `POST /api/auth/resend-verification` - Resend verification code

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/short` - Get short product list
- `GET /api/products/wide` - Get wide product list

### Parishes
- `GET /api/parishes` - List all parishes
- `POST /api/parishes` - Create new parish
- `GET /api/parishes/:id` - Get parish by ID
- `PUT /api/parishes/:id` - Update parish
- `DELETE /api/parishes/:id` - Delete parish
- `GET /api/parishes/totals` - Get parish totals/statistics

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create new category
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/categories/:id/products` - Get products by category
- `GET /api/categories/products-count` - Get product count per category

### Users
- `GET /api/users` - List all users (admin only)
- `PUT /api/users/avatar` - Update user avatar
- `PUT /api/users/role` - Update user role (admin only)
- `PUT /api/users/change-password` - Change user password

### Utilities
- `POST /api/upload` - Upload image to Cloudinary
- `POST /api/translate` - Translate text

## 🎨 Technologies Used

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **shadcn/ui** - Re-usable component library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication
- **next-intl** - Internationalization
- **next-themes** - Theme management
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

### Backend
- **Node.js** - Runtime environment
- **Next.js API Routes** - API endpoints
- **Prisma** - ORM for database access
- **PostgreSQL** - Database
- **Socket.IO** - WebSocket server
- **JWT (jose)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **Cloudinary** - Image hosting

### DevOps & Testing
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **tsx** - TypeScript execution
- **cross-env** - Environment variables

## 🔐 Authentication Flow

1. User registers with email and password
2. System sends verification email with 4-digit code
3. User verifies email with the code
4. User can log in with credentials
5. System issues JWT token stored in HTTP-only cookie
6. Token used for authenticated API requests

## 🌍 Internationalization

The application supports two languages:
- **English (en)**
- **Russian (ru)**

Language switching is available in the UI, and all content (products, categories, parishes) stores translations in both languages.

## 🚀 Deployment

### Environment Variables for Production

Ensure the following environment variables are set:

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_WS_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Deployment Steps

1. Build the application: `npm run build`
2. Run database migrations: `npm run db:migrate`
3. Seed the database if needed: `npm run db:seed`
4. Start the production server: `npm run start`

Or use Docker:
```bash
docker-compose --profile prod up -d
```