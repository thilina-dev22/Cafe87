// server/src/seed.ts — seeds admin user + existing menu/room data
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { roomsData, cafeMenuFull } from '../../src/data/siteData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin user
  const passwordHash = await bcrypt.hash('cafe87admin', 12);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@87ahangama.com' },
    update: {},
    create: { email: 'admin@87ahangama.com', passwordHash, name: 'Cafe 87 Admin' },
  });
  console.log(`✅ Admin: ${admin.email}`);

  // Rooms
  for (const room of roomsData) {
    const existing = await prisma.room.findUnique({ where: { slug: room.id } });
    if (!existing) {
      const created = await prisma.room.create({
        data: {
          slug: room.id,
          name: room.name,
          subtitle: room.subtitle,
          description: room.description,
          price: room.price,
          pricePeriod: room.pricePeriod,
          size: room.size,
          capacity: room.capacity,
          bed: room.bed,
          view: room.view,
          bookingUrl: room.bookingUrl,
          agodaUrl: room.agodaUrl,
          highlights: room.highlights || [],
          features: room.features || [],
          sortOrder: roomsData.indexOf(room),
          photos: {
            create: (room.gallery || [room.image]).map((url: string, i: number) => ({
              url,
              caption: null,
              isPreview: url === room.image,
              sortOrder: i,
            })),
          },
        },
      });
      console.log(`✅ Room: ${created.name}`);
    }
  }

  // Menu categories
  for (const cat of cafeMenuFull) {
    const existing = await prisma.menuCategory.findUnique({ where: { slug: cat.id } });
    if (!existing) {
      const created = await prisma.menuCategory.create({
        data: {
          slug: cat.id,
          name: cat.category,
          subtitle: cat.subtitle || null,
          sortOrder: cafeMenuFull.indexOf(cat),
          items: cat.items?.length
            ? {
                create: cat.items.map((item: any, i: number) => ({
                  name: item.name,
                  price: item.price || null,
                  desc: item.desc || null,
                  sortOrder: i,
                })),
              }
            : undefined,
          subsections: cat.subsections?.length
            ? {
                create: cat.subsections.map((sub: any, si: number) => ({
                  subtitle: sub.subtitle,
                  sortOrder: si,
                  items: {
                    create: sub.items.map((item: any, ii: number) => ({
                      name: item.name,
                      price: item.price || null,
                      desc: item.desc || null,
                      sortOrder: ii,
                    })),
                  },
                })),
              }
            : undefined,
          addons: cat.addons?.length
            ? {
                create: cat.addons.map((a: any, i: number) => ({
                  name: a.name,
                  price: a.price || null,
                  sortOrder: i,
                })),
              }
            : undefined,
        },
      });
      console.log(`✅ Menu category: ${created.name}`);
    }
  }

  // Default settings
  await prisma.siteSetting.upsert({
    where: { key: 'showMenuPrices' },
    update: {},
    create: { key: 'showMenuPrices', value: 'true' },
  });

  console.log('🎉 Seed complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
