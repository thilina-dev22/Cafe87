// server/src/modules/menu/menu.routes.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../db/prisma.js';
import { requireAdmin } from '../../middleware/requireAdmin.js';

export const menuRouter = Router();

const toInt = (val: string | string[] | undefined): number => {
  const str = Array.isArray(val) ? val[0] : val;
  return str ? parseInt(str, 10) : NaN;
};

// ─── Schemas ──────────────────────────────────────────────────────────────────

const ItemSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.string().max(50).optional().nullable(),
  desc: z.string().max(500).optional().nullable(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  subsectionId: z.number().int().optional().nullable(),
});

const SubsectionSchema = z.object({
  subtitle: z.string().min(1).max(100),
  sortOrder: z.number().int().optional(),
  items: z.array(ItemSchema).optional(),
});

const CategorySchema = z.object({
  slug: z.string().min(1).max(80),
  name: z.string().min(1).max(100),
  subtitle: z.string().max(200).optional().nullable(),
  icon: z.string().max(50).optional().nullable(),
  badge: z.string().max(50).optional().nullable(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

const AddonSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.string().max(50).optional().nullable(),
  sortOrder: z.number().int().optional(),
});

// ─── Public ───────────────────────────────────────────────────────────────────

// GET /api/menu  — full public menu
menuRouter.get('/', async (_req, res) => {
  try {
    const categories = await prisma.menuCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        items: {
          where: { isActive: true, subsectionId: null },
          orderBy: { sortOrder: 'asc' },
        },
        subsections: {
          orderBy: { sortOrder: 'asc' },
          include: {
            items: {
              where: { isActive: true },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
        addons: { orderBy: { sortOrder: 'asc' } },
      },
    });
    res.json(categories);
  } catch (err) {
    console.error('[menu/GET]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Admin — Categories ───────────────────────────────────────────────────────

// GET /api/admin/menu
menuRouter.get('/admin/all', requireAdmin, async (_req, res) => {
  try {
    const categories = await prisma.menuCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        items: { where: { subsectionId: null }, orderBy: { sortOrder: 'asc' } },
        subsections: {
          orderBy: { sortOrder: 'asc' },
          include: { items: { orderBy: { sortOrder: 'asc' } } },
        },
        addons: { orderBy: { sortOrder: 'asc' } },
      },
    });
    res.json(categories);
  } catch (err) {
    console.error('[admin/menu/GET]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/menu/categories
menuRouter.post('/admin/categories', requireAdmin, async (req, res) => {
  try {
    const data = CategorySchema.parse(req.body);
    const category = await prisma.menuCategory.create({ data });
    res.status(201).json(category);
  } catch (err: any) {
    if (err?.name === 'ZodError') { res.status(400).json({ error: 'Validation failed', details: err.errors }); return; }
    if (err?.code === 'P2002') { res.status(409).json({ error: 'Slug already exists' }); return; }
    console.error('[admin/menu/categories/POST]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/menu/categories/:id
menuRouter.put('/admin/categories/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    const data = CategorySchema.partial().parse(req.body);
    const category = await prisma.menuCategory.update({ where: { id }, data });
    res.json(category);
  } catch (err: any) {
    if (err?.name === 'ZodError') { res.status(400).json({ error: 'Validation failed', details: err.errors }); return; }
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Category not found' }); return; }
    console.error('[admin/menu/categories/PUT]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/menu/categories/:id
menuRouter.delete('/admin/categories/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    await prisma.menuCategory.delete({ where: { id } });
    res.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Category not found' }); return; }
    console.error('[admin/menu/categories/DELETE]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Admin — Subsections ──────────────────────────────────────────────────────

// POST /api/admin/menu/categories/:categoryId/subsections
menuRouter.post('/admin/categories/:categoryId/subsections', requireAdmin, async (req, res) => {
  try {
    const categoryId = toInt(req.params.categoryId);
    if (isNaN(categoryId)) { res.status(400).json({ error: 'Invalid category id' }); return; }
    const data = SubsectionSchema.parse(req.body);
    const { items, ...subData } = data;
    const subsection = await prisma.menuSubsection.create({
      data: {
        ...subData,
        categoryId,
        items: items?.length ? { create: items.map((it, i) => ({ ...it, categoryId, sortOrder: it.sortOrder ?? i })) } : undefined,
      },
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    });
    res.status(201).json(subsection);
  } catch (err: any) {
    if (err?.name === 'ZodError') { res.status(400).json({ error: 'Validation failed', details: err.errors }); return; }
    console.error('[admin/menu/subsections/POST]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/menu/subsections/:id
menuRouter.put('/admin/subsections/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    const data = SubsectionSchema.partial().omit({ items: true }).parse(req.body);
    const updated = await prisma.menuSubsection.update({ where: { id }, data, include: { items: true } });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Subsection not found' }); return; }
    console.error('[admin/menu/subsections/PUT]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/menu/subsections/:id
menuRouter.delete('/admin/subsections/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    await prisma.menuSubsection.delete({ where: { id } });
    res.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Subsection not found' }); return; }
    console.error('[admin/menu/subsections/DELETE]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Admin — Items ────────────────────────────────────────────────────────────

// POST /api/admin/menu/categories/:categoryId/items
menuRouter.post('/admin/categories/:categoryId/items', requireAdmin, async (req, res) => {
  try {
    const categoryId = toInt(req.params.categoryId);
    if (isNaN(categoryId)) { res.status(400).json({ error: 'Invalid category id' }); return; }
    const data = ItemSchema.parse(req.body);
    const item = await prisma.menuItem.create({ data: { ...data, categoryId } });
    res.status(201).json(item);
  } catch (err: any) {
    if (err?.name === 'ZodError') { res.status(400).json({ error: 'Validation failed', details: err.errors }); return; }
    console.error('[admin/menu/items/POST]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/menu/items/:id
menuRouter.put('/admin/items/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    const data = ItemSchema.partial().parse(req.body);
    const item = await prisma.menuItem.update({ where: { id }, data });
    res.json(item);
  } catch (err: any) {
    if (err?.name === 'ZodError') { res.status(400).json({ error: 'Validation failed', details: err.errors }); return; }
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Item not found' }); return; }
    console.error('[admin/menu/items/PUT]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/menu/items/:id
menuRouter.delete('/admin/items/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    await prisma.menuItem.delete({ where: { id } });
    res.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Item not found' }); return; }
    console.error('[admin/menu/items/DELETE]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Admin — Add-ons ──────────────────────────────────────────────────────────

// POST /api/admin/menu/categories/:categoryId/addons
menuRouter.post('/admin/categories/:categoryId/addons', requireAdmin, async (req, res) => {
  try {
    const categoryId = toInt(req.params.categoryId);
    if (isNaN(categoryId)) { res.status(400).json({ error: 'Invalid category id' }); return; }
    const data = AddonSchema.parse(req.body);
    const addon = await prisma.menuAddon.create({ data: { ...data, categoryId } });
    res.status(201).json(addon);
  } catch (err: any) {
    if (err?.name === 'ZodError') { res.status(400).json({ error: 'Validation failed', details: err.errors }); return; }
    console.error('[admin/menu/addons/POST]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/menu/addons/:id
menuRouter.put('/admin/addons/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    const data = AddonSchema.partial().parse(req.body);
    const addon = await prisma.menuAddon.update({ where: { id }, data });
    res.json(addon);
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Addon not found' }); return; }
    console.error('[admin/menu/addons/PUT]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/menu/addons/:id
menuRouter.delete('/admin/addons/:id', requireAdmin, async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
    await prisma.menuAddon.delete({ where: { id } });
    res.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Addon not found' }); return; }
    console.error('[admin/menu/addons/DELETE]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Site Settings (show/hide prices toggle) ──────────────────────────────────

// GET /api/menu/settings — public: get settings
menuRouter.get('/settings', async (_req, res) => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'showMenuPrices' } });
    res.json({ showMenuPrices: setting ? setting.value === 'true' : true });
  } catch (err) {
    console.error('[menu/settings/GET]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/menu/settings — admin: toggle
menuRouter.put('/admin/settings', requireAdmin, async (req, res) => {
  try {
    const { showMenuPrices } = z.object({ showMenuPrices: z.boolean() }).parse(req.body);
    await prisma.siteSetting.upsert({
      where: { key: 'showMenuPrices' },
      update: { value: String(showMenuPrices) },
      create: { key: 'showMenuPrices', value: String(showMenuPrices) },
    });
    res.json({ showMenuPrices });
  } catch (err: any) {
    if (err?.name === 'ZodError') { res.status(400).json({ error: 'Validation failed', details: err.errors }); return; }
    console.error('[admin/menu/settings/PUT]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
