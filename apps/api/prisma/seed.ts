import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { Gender, PrismaClient, ProductStatus, UserRole } from '../src/generated/prisma/client.js';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL es obligatoria para ejecutar el seed.');
const prisma = new PrismaClient({ adapter: new PrismaMariaDb(databaseUrl) });

const categories = ['Camisetas', 'Chaquetas', 'Pantalones', 'Zapatos', 'Accesorios', 'Exclusivo'];
const slugify = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function main(): Promise<void> {
  const password = process.env.SEED_SELLER_PASSWORD;
  if (!password) throw new Error('SEED_SELLER_PASSWORD es obligatoria para ejecutar el seed.');
  const seller = await prisma.user.upsert({
    where: { email: 'seed-seller@example.test' },
    update: {},
    create: { email: 'seed-seller@example.test', fullName: 'Vendedor de muestra', passwordHash: await bcrypt.hash(password, 12), role: UserRole.SELLER, city: 'Cali', acceptedTermsAt: new Date() },
  });
  const categoryRows = await Promise.all(categories.map((name) => prisma.category.upsert({ where: { slug: slugify(name) }, update: { name }, create: { slug: slugify(name), name } })));
  const categoryMap = new Map(categoryRows.map((category) => [category.name, category]));
  const store = await prisma.store.upsert({
    where: { slug: 'dark-demo' },
    update: {},
    create: { ownerId: seller.id, slug: 'dark-demo', name: 'DARK Demo', subtitle: 'Datos de demostración', description: 'Tienda de muestra creada exclusivamente por el seed local.', city: 'Cali, Colombia', imageUrl: 'https://placehold.co/1200x900/111111/FFFFFF?text=DARK+Demo' },
  });
  const products = [
    { slug: 'camiseta-oversize-demo', name: 'Camiseta oversize de muestra', category: 'Camisetas', gender: Gender.UNISEX, price: 35000, compareAtPrice: 75500, badge: 'Descuento', tags: ['Oversize', 'Casual'], variants: [['S', 'Negro', '#080808', 12], ['M', 'Negro', '#080808', 10], ['L', 'Blanco', '#F5F5F3', 6]] },
    { slug: 'hoodie-aniversario-demo', name: 'Hoodie aniversario de muestra', category: 'Chaquetas', gender: Gender.MEN, price: 65000, compareAtPrice: null, badge: 'Nuevo drop', tags: ['Grunge', 'Underground'], variants: [['M', 'Negro', '#080808', 8], ['L', 'Vinotinto', '#491C25', 5]] },
  ] as const;
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: { storeId: store.id, categoryId: categoryMap.get(product.category)!.id, slug: product.slug, name: product.name, description: 'Producto de muestra del seed local. Sus datos no representan inventario ni una oferta real.', gender: product.gender, price: product.price, compareAtPrice: product.compareAtPrice, badge: product.badge, referenceTags: [...product.tags], status: ProductStatus.ACTIVE, images: { create: [{ url: `https://placehold.co/900x1200/111111/FFFFFF?text=${encodeURIComponent(product.name)}`, alt: product.name, position: 0 }] }, variants: { create: product.variants.map(([size, colorName, colorHex, stock], index) => ({ sku: `DEMO-${product.slug.toUpperCase()}-${index + 1}`, size, colorName, colorHex, stock })) } },
    });
  }
  const collection = await prisma.collection.upsert({ where: { slug: 'basicas' }, update: {}, create: { slug: 'basicas', name: 'Básicas', tagline: 'Los esenciales construidos para durar.', description: 'Colección de demostración creada por el seed local.' } });
  const collectionProducts = await prisma.product.findMany({ where: { slug: { in: products.map((product) => product.slug) } }, select: { id: true, slug: true } });
  await Promise.all(collectionProducts.map((product, position) => prisma.productCollection.upsert({ where: { productId_collectionId: { productId: product.id, collectionId: collection.id } }, update: { position }, create: { productId: product.id, collectionId: collection.id, position } })));
  console.log('Seed completado. Usuario de muestra: seed-seller@example.test');
}

main().finally(() => prisma.$disconnect());
