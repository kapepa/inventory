import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Setup adapter for Prisma 7
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // ============================================
  // Clear database
  // ============================================
  await prisma.price.deleteMany()
  await prisma.rental.deleteMany()
  await prisma.productTranslation.deleteMany()
  await prisma.product.deleteMany()
  await prisma.userParish.deleteMany()
  await prisma.parishTranslation.deleteMany()
  await prisma.parish.deleteMany()
  await prisma.categoryTranslation.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Database cleared')

  // ============================================
  // 1. CREATE USERS
  // ============================================
  console.log('\n📝 Creating users...');

  const adminPassword = await hashPassword('admin123456');
  const user1Password = await hashPassword('john123456');
  const user2Password = await hashPassword('jane123456');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const john = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: user1Password,
      role: 'USER',
    },
  });

  const jane = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: user2Password,
      role: 'USER',
    },
  });

  console.log(`   ✅ Users created:`);
  console.log(`      - ${admin.name} (${admin.email}) / Password: admin123456`);
  console.log(`      - ${john.name} (${john.email}) / Password: john123456`);
  console.log(`      - ${jane.name} (${jane.email}) / Password: jane123456`);

  // ============================================
  // 2. CREATE PARISHES
  // ============================================
  console.log('\n📝 Creating parishes...');

  const parish1 = await prisma.parish.upsert({
    where: { id: '11111111-1111-1111-1111-111111111111' },
    update: {},
    create: {
      id: '11111111-1111-1111-1111-111111111111',
      deliveryDate: new Date('2026-05-15'),
      translations: {
        create: [
          {
            locale: 'ru',
            title: 'Приход мониторов',
            description: 'Приход, ответственный за инвентаризацию мониторов',
          },
          {
            locale: 'en',
            title: 'Parish of Monitors',
            description: 'Parish responsible for monitor inventory',
          },
        ],
      },
    },
  });

  const parish2 = await prisma.parish.upsert({
    where: { id: '22222222-2222-2222-2222-222222222222' },
    update: {},
    create: {
      id: '22222222-2222-2222-2222-222222222222',
      deliveryDate: new Date('2026-05-20'),
      translations: {
        create: [
          {
            locale: 'ru',
            title: 'Приход клавиатур',
            description: 'Приход, ответственный за инвентаризацию клавиатур',
          },
          {
            locale: 'en',
            title: 'Parish of Keyboards',
            description: 'Parish responsible for keyboard inventory',
          },
        ],
      },
    },
  });

  const parish3 = await prisma.parish.upsert({
    where: { id: '33333333-3333-3333-3333-333333333333' },
    update: {},
    create: {
      id: '33333333-3333-3333-3333-333333333333',
      deliveryDate: new Date('2026-05-25'),
      translations: {
        create: [
          {
            locale: 'ru',
            title: 'Приход принтеров',
            description: 'Приход, ответственный за инвентаризацию принтеров',
          },
          {
            locale: 'en',
            title: 'Parish of Printers',
            description: 'Parish responsible for printer inventory',
          },
        ],
      },
    },
  });

  // Create relationships between users and parishes
  console.log('\n📝 Creating user-parish relationships...');

  await prisma.userParish.createMany({
    data: [
      { userId: john.id, parishId: parish1.id },
      { userId: jane.id, parishId: parish1.id },
      { userId: jane.id, parishId: parish2.id },
      { userId: admin.id, parishId: parish3.id },
    ],
    skipDuplicates: true,
  });

  console.log(`   ✅ User-parish relationships created`);

  // ============================================
  // 3. CREATE CATEGORIES (10 categories)
  // ============================================
  console.log('\n📝 Creating 10 categories...');

  const categoriesData = [
    { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', ru: 'Мониторы', en: 'Monitors' },
    { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', ru: 'Клавиатуры', en: 'Keyboards' },
    { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', ru: 'Принтеры', en: 'Printers' },
    { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', ru: 'Мыши', en: 'Mice' },
    { id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', ru: 'Наушники', en: 'Headphones' },
    { id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', ru: 'Веб-камеры', en: 'Webcams' },
    { id: '11111111-1111-1111-1111-111111111112', ru: 'Микрофоны', en: 'Microphones' },
    { id: '22222222-2222-2222-2222-222222222223', ru: 'Колонки', en: 'Speakers' },
    { id: '33333333-3333-3333-3333-333333333334', ru: 'Ноутбуки', en: 'Laptops' },
    { id: '44444444-4444-4444-4444-444444444445', ru: 'Планшеты', en: 'Tablets' },
  ];

  const categories = [];

  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        translations: {
          create: [
            { locale: 'ru', title: cat.ru },
            { locale: 'en', title: cat.en },
          ],
        },
      },
    });
    categories.push(category);
    console.log(`      - Created category: ${cat.ru} / ${cat.en}`);
  }

  console.log(`   ✅ Created ${categories.length} categories`);

  // ============================================
  // 4. CREATE PRODUCTS (20 products)
  // ============================================
  console.log('\n📝 Creating 20 products...');

  const productsData = [
    // Monitors (category index 0)
    { sn: 1001, name: 'Dell 27"', ruName: 'Монитор Dell 27"', ruSpec: '4K UHD, IPS матрица, 144Hz', enSpec: '4K UHD, IPS panel, 144Hz', category: categories[0], parish: parish1, user: john, priceUsd: 399.99 },
    { sn: 1002, name: 'LG 24"', ruName: 'Монитор LG 24"', ruSpec: 'Full HD, VA матрица, 75Hz', enSpec: 'Full HD, VA panel, 75Hz', category: categories[0], parish: parish1, user: john, priceUsd: 179.99 },
    { sn: 1003, name: 'Samsung 32"', ruName: 'Монитор Samsung 32"', ruSpec: '4K UHD, изогнутый, 165Hz', enSpec: '4K UHD, curved, 165Hz', category: categories[0], parish: parish1, user: john, priceUsd: 599.99 },
    { sn: 1004, name: 'ASUS 24"', ruName: 'Монитор ASUS 24"', ruSpec: 'Full HD, IPS, 144Hz', enSpec: 'Full HD, IPS, 144Hz', category: categories[0], parish: parish1, user: john, priceUsd: 249.99 },

    // Keyboards (category index 1)
    { sn: 2001, name: 'Mechanical Keyboard', ruName: 'Механическая клавиатура', ruSpec: 'Механические переключатели, RGB', enSpec: 'Mechanical switches, RGB', category: categories[1], parish: parish2, user: jane, priceUsd: 149.99 },
    { sn: 2002, name: 'Gaming Keyboard', ruName: 'Игровая клавиатура', ruSpec: 'Мембранная, RGB, макросы', enSpec: 'Membrane, RGB, macros', category: categories[1], parish: parish2, user: jane, priceUsd: 89.99 },
    { sn: 2003, name: 'Wireless Keyboard', ruName: 'Беспроводная клавиатура', ruSpec: 'Bluetooth, тихая, компактная', enSpec: 'Bluetooth, quiet, compact', category: categories[1], parish: parish2, user: jane, priceUsd: 69.99 },
    { sn: 2004, name: 'Ergonomic Keyboard', ruName: 'Эргономичная клавиатура', ruSpec: 'Разделенная, подставка для рук', enSpec: 'Split, wrist rest', category: categories[1], parish: parish2, user: jane, priceUsd: 129.99 },

    // Printers (category index 2)
    { sn: 3001, name: 'HP LaserJet', ruName: 'Принтер HP LaserJet', ruSpec: 'Лазерный, двусторонняя печать', enSpec: 'Laser, duplex printing', category: categories[2], parish: parish3, user: admin, priceUsd: 299.99 },
    { sn: 3002, name: 'Epson EcoTank', ruName: 'Принтер Epson EcoTank', ruSpec: 'Струйный, непрерывная подача чернил', enSpec: 'Inkjet, continuous ink supply', category: categories[2], parish: parish3, user: admin, priceUsd: 399.99 },
    { sn: 3003, name: 'Canon PIXMA', ruName: 'Принтер Canon PIXMA', ruSpec: 'Струйный, фотопечать', enSpec: 'Inkjet, photo printing', category: categories[2], parish: parish3, user: admin, priceUsd: 199.99 },
    { sn: 3004, name: 'Brother HL', ruName: 'Принтер Brother HL', ruSpec: 'Монохромный лазерный', enSpec: 'Monochrome laser', category: categories[2], parish: parish3, user: admin, priceUsd: 249.99 },

    // Mice (category index 3)
    { sn: 4001, name: 'Logitech MX Master', ruName: 'Мышь Logitech MX Master', ruSpec: 'Беспроводная, эргономичная', enSpec: 'Wireless, ergonomic', category: categories[3], parish: parish2, user: jane, priceUsd: 89.99 },
    { sn: 4002, name: 'Gaming Mouse', ruName: 'Игровая мышь', ruSpec: 'RGB, 16000 DPI, 7 кнопок', enSpec: 'RGB, 16000 DPI, 7 buttons', category: categories[3], parish: parish2, user: jane, priceUsd: 59.99 },
    { sn: 4003, name: 'Vertical Mouse', ruName: 'Вертикальная мышь', ruSpec: 'Эргономичная, Bluetooth', enSpec: 'Ergonomic, Bluetooth', category: categories[3], parish: parish2, user: jane, priceUsd: 49.99 },

    // Headphones (category index 4)
    { sn: 5001, name: 'Sony WH-1000XM', ruName: 'Наушники Sony WH-1000XM', ruSpec: 'Беспроводные, шумоподавление', enSpec: 'Wireless, noise cancelling', category: categories[4], parish: parish1, user: john, priceUsd: 349.99 },
    { sn: 5002, name: 'Gaming Headset', ruName: 'Игровая гарнитура', ruSpec: '7.1 surround, RGB, микрофон', enSpec: '7.1 surround, RGB, mic', category: categories[4], parish: parish1, user: john, priceUsd: 79.99 },
    { sn: 5003, name: 'AirPods Pro', ruName: 'AirPods Pro', ruSpec: 'Беспроводные, активное шумоподавление', enSpec: 'Wireless, active noise cancelling', category: categories[4], parish: parish1, user: john, priceUsd: 249.99 },

    // Webcams (category index 5)
    { sn: 6001, name: 'Logitech C920', ruName: 'Веб-камера Logitech C920', ruSpec: 'Full HD, автофокус', enSpec: 'Full HD, autofocus', category: categories[5], parish: parish2, user: jane, priceUsd: 89.99 },
    { sn: 6002, name: '4K Webcam', ruName: '4K Веб-камера', ruSpec: '4K UHD, широкий угол', enSpec: '4K UHD, wide angle', category: categories[5], parish: parish2, user: jane, priceUsd: 199.99 },
  ];

  for (let i = 0; i < productsData.length; i++) {
    const p = productsData[i];
    const statuses: ('FREE' | 'BUSY' | 'REPAIR')[] = ['FREE', 'BUSY', 'REPAIR'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    await prisma.product.upsert({
      where: { serialNumber: p.sn },
      update: {},
      create: {
        serialNumber: p.sn,
        isNew: i < 10,
        status: randomStatus,
        photo: `/images/products/product-${p.sn}.jpg`,
        order: i + 1,
        categoryId: p.category.id,
        parishId: p.parish.id,
        userId: p.user.id,
        translations: {
          create: [
            {
              locale: 'ru',
              title: p.ruName,
              specification: p.ruSpec,
            },
            {
              locale: 'en',
              title: p.name,
              specification: p.enSpec,
            },
          ],
        },
        prices: {
          create: [
            { value: p.priceUsd, symbol: 'USD' },
            { value: p.priceUsd * 40, symbol: 'UAH' },
          ],
        },
        ...(i % 3 === 0 && {
          rental: {
            create: {
              startDate: new Date('2024-01-15T10:00:00Z'),
              endDate: new Date('2024-06-15T18:00:00Z'),
            },
          },
        }),
      },
    });
  }

  // Get products with translations for display
  const productsWithTranslations = await prisma.product.findMany({
    take: 20,
    orderBy: { serialNumber: 'asc' },
    include: {
      translations: true,
    },
  });

  console.log(`   ✅ Products created:`);
  for (const product of productsWithTranslations) {
    const ruTranslation = product.translations.find(t => t.locale === 'ru');
    console.log(`      - ${ruTranslation?.title || product.serialNumber} (SN: ${product.serialNumber}) - Status: ${product.status}`);
  }

  // ============================================
  // 5. DATABASE STATISTICS
  // ============================================
  console.log('\n📊 Database statistics:');

  const usersCount = await prisma.user.count();
  const parishesCount = await prisma.parish.count();
  const categoriesCount = await prisma.category.count();
  const productsCount = await prisma.product.count();
  const rentalsCount = await prisma.rental.count();
  const pricesCount = await prisma.price.count();
  const userParishesCount = await prisma.userParish.count();
  const translationsCount =
    await prisma.parishTranslation.count() +
    await prisma.categoryTranslation.count() +
    await prisma.productTranslation.count();

  console.log(`   👥 Users: ${usersCount}`);
  console.log(`   🏛️ Parishes: ${parishesCount}`);
  console.log(`   🔗 User-Parish relationships: ${userParishesCount}`);
  console.log(`   📁 Categories: ${categoriesCount}`);
  console.log(`   📦 Products: ${productsCount}`);
  console.log(`   📅 Rentals: ${rentalsCount}`);
  console.log(`   💰 Prices: ${pricesCount}`);
  console.log(`   🌐 Translations: ${translationsCount}`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📝 Test credentials:');
  console.log(`   Admin: admin@example.com / admin123456`);
  console.log(`   User: john.doe@example.com / john123456`);
  console.log(`   User: jane.smith@example.com / jane123456`);
}

main()
  .catch((e) => {
    console.error('\n❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });