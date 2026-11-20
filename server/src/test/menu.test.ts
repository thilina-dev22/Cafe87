import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import { prisma } from '../db/prisma.js';

describe('Café Menu & Price Visibility Management', () => {
  let adminToken: string;
  let testCategoryId: number;
  let testSubsectionId: number;
  let testItemId: number;
  let testAddonId: number;

  beforeAll(async () => {
    // Log in as admin
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@87ahangama.com', password: 'cafe87admin' });
    adminToken = loginRes.body.token;
  });

  it('1. GET /api/menu returns full public menu with categories and subsections', async () => {
    const res = await request(app).get('/api/menu');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(5);

    const brunch = res.body.find((c: any) => c.slug === 'all-day-brunch');
    expect(brunch).toBeDefined();
    expect(brunch.items.length).toBeGreaterThan(0);
    expect(brunch.addons.length).toBeGreaterThan(0);
  });

  it('2. GET /api/menu/settings returns price visibility setting', async () => {
    const res = await request(app).get('/api/menu/settings');
    expect(res.status).toBe(200);
    expect(typeof res.body.showMenuPrices).toBe('boolean');
  });

  it('3. PUT /api/menu/admin/settings toggles price visibility to false', async () => {
    const res = await request(app)
      .put('/api/menu/admin/settings')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ showMenuPrices: false });

    expect(res.status).toBe(200);
    expect(res.body.showMenuPrices).toBe(false);

    // Verify public settings reflect change
    const checkRes = await request(app).get('/api/menu/settings');
    expect(checkRes.body.showMenuPrices).toBe(false);
  });

  it('4. PUT /api/menu/admin/settings toggles price visibility back to true', async () => {
    const res = await request(app)
      .put('/api/menu/admin/settings')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ showMenuPrices: true });

    expect(res.status).toBe(200);
    expect(res.body.showMenuPrices).toBe(true);
  });

  it('5. POST /api/menu/admin/categories creates a new menu category', async () => {
    const res = await request(app)
      .post('/api/menu/admin/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        slug: 'artisan-bakery-test',
        name: 'Artisan Bakery',
        subtitle: 'Freshly baked sourdough and pastries',
        badge: 'New',
        sortOrder: 10,
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('Artisan Bakery');
    testCategoryId = res.body.id;
  });

  it('6. PUT /api/menu/admin/categories/:id updates the category', async () => {
    const res = await request(app)
      .put(`/api/menu/admin/categories/${testCategoryId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        badge: 'Special',
        subtitle: 'Artisanal morning pastries',
      });

    expect(res.status).toBe(200);
    expect(res.body.badge).toBe('Special');
    expect(res.body.subtitle).toBe('Artisanal morning pastries');
  });

  it('7. POST /api/menu/admin/categories/:categoryId/subsections creates a subsection', async () => {
    const res = await request(app)
      .post(`/api/menu/admin/categories/${testCategoryId}/subsections`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        subtitle: 'Pastries & Viennoiserie',
        sortOrder: 0,
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.subtitle).toBe('Pastries & Viennoiserie');
    testSubsectionId = res.body.id;
  });

  it('8. POST /api/menu/admin/categories/:categoryId/items creates a menu item in subsection', async () => {
    const res = await request(app)
      .post(`/api/menu/admin/categories/${testCategoryId}/items`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Almond Croissant',
        price: 'LKR 1,200',
        desc: 'Twice-baked flaky croissant with rich almond frangipane',
        subsectionId: testSubsectionId,
        sortOrder: 0,
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('Almond Croissant');
    expect(res.body.price).toBe('LKR 1,200');
    testItemId = res.body.id;
  });

  it('9. PUT /api/menu/admin/items/:id updates the menu item price and details', async () => {
    const res = await request(app)
      .put(`/api/menu/admin/items/${testItemId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        price: 'LKR 1,350',
        name: 'Artisan Almond Croissant',
      });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe('LKR 1,350');
    expect(res.body.name).toBe('Artisan Almond Croissant');
  });

  it('10. POST /api/menu/admin/categories/:categoryId/addons creates an addon option', async () => {
    const res = await request(app)
      .post(`/api/menu/admin/categories/${testCategoryId}/addons`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Vanilla Bean Butter',
        price: 'LKR 250',
        sortOrder: 0,
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('Vanilla Bean Butter');
    testAddonId = res.body.id;
  });

  it('11. DELETE /api/menu/admin/items/:id deletes an item', async () => {
    const res = await request(app)
      .delete(`/api/menu/admin/items/${testItemId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const check = await prisma.menuItem.findUnique({ where: { id: testItemId } });
    expect(check).toBeNull();
  });

  it('12. DELETE /api/menu/admin/addons/:id deletes an addon', async () => {
    const res = await request(app)
      .delete(`/api/menu/admin/addons/${testAddonId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const check = await prisma.menuAddon.findUnique({ where: { id: testAddonId } });
    expect(check).toBeNull();
  });

  it('13. DELETE /api/menu/admin/categories/:id deletes category and cascades all children', async () => {
    const res = await request(app)
      .delete(`/api/menu/admin/categories/${testCategoryId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const checkCategory = await prisma.menuCategory.findUnique({ where: { id: testCategoryId } });
    expect(checkCategory).toBeNull();

    const checkSubsection = await prisma.menuSubsection.findUnique({ where: { id: testSubsectionId } });
    expect(checkSubsection).toBeNull();
  });
});
