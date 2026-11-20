// server/src/modules/rooms/rooms.routes.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../db/prisma.js';
import { requireAdmin } from '../../middleware/requireAdmin.js';

export const roomsRouter = Router();

// ─── Validation Schemas ───────────────────────────────────────────────────────

const PhotoSchema = z.object({
  url: z.string().min(1, 'Photo URL required'),
  caption: z.string().max(120).optional().nullable(),
  isPreview: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

const RoomSchema = z.object({
  slug: z.string().min(1).max(80),
  name: z.string().min(1).max(100),
  subtitle: z.string().max(200),
  description: z.string().min(1),
  price: z.string().max(50).optional().nullable(),
  pricePeriod: z.string().max(50).optional().nullable(),
  size: z.string().max(50).optional().nullable(),
  capacity: z.string().max(50).optional().nullable(),
  bed: z.string().max(100).optional().nullable(),
  view: z.string().max(100).optional().nullable(),
  bookingUrl: z.string().url().optional().nullable().or(z.literal('')),
  agodaUrl: z.string().url().optional().nullable().or(z.literal('')),
  highlights: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  photos: z.array(PhotoSchema).max(20).optional(),
});

// ─── Public ───────────────────────────────────────────────────────────────────

// GET /api/rooms  — public listing
roomsRouter.get('/', async (_req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
      },
    });
    res.json(rooms);
  } catch (err) {
    console.error('[rooms/GET]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/rooms/:slug  — public single room
roomsRouter.get('/:slug', async (req, res) => {
  try {
    const room = await prisma.room.findUnique({
      where: { slug: req.params.slug },
      include: { photos: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!room || !room.isActive) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }
    res.json(room);
  } catch (err) {
    console.error('[rooms/GET/:slug]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Admin CRUD ───────────────────────────────────────────────────────────────

// GET /api/admin/rooms  — admin listing (all rooms incl. inactive)
roomsRouter.get('/admin/all', requireAdmin, async (_req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { photos: { orderBy: { sortOrder: 'asc' } } },
    });
    res.json(rooms);
  } catch (err) {
    console.error('[admin/rooms/GET]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/rooms  — create room
roomsRouter.post('/admin', requireAdmin, async (req, res) => {
  try {
    const data = RoomSchema.parse(req.body);
    const { photos, ...roomData } = data;

    const room = await prisma.room.create({
      data: {
        ...roomData,
        photos: photos?.length
          ? {
              create: photos.map((p, i) => ({
                url: p.url,
                caption: p.caption ?? null,
                isPreview: p.isPreview ?? i === 0,
                sortOrder: p.sortOrder ?? i,
              })),
            }
          : undefined,
      },
      include: { photos: { orderBy: { sortOrder: 'asc' } } },
    });
    res.status(201).json(room);
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
      return;
    }
    if (err?.code === 'P2002') {
      res.status(409).json({ error: 'A room with this slug already exists' });
      return;
    }
    console.error('[admin/rooms/POST]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/rooms/:id  — update room
roomsRouter.put('/admin/:id', requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid room id' }); return; }

    const data = RoomSchema.partial().parse(req.body);
    const { photos, ...roomData } = data;

    const room = await prisma.room.update({
      where: { id },
      data: roomData,
      include: { photos: { orderBy: { sortOrder: 'asc' } } },
    });
    res.json(room);
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
      return;
    }
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Room not found' }); return; }
    console.error('[admin/rooms/PUT]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/rooms/:id
roomsRouter.delete('/admin/:id', requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid room id' }); return; }
    await prisma.room.delete({ where: { id } });
    res.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Room not found' }); return; }
    console.error('[admin/rooms/DELETE]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Photo Management ─────────────────────────────────────────────────────────

// POST /api/admin/rooms/:id/photos  — add photo(s)
roomsRouter.post('/admin/:id/photos', requireAdmin, async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);
    if (isNaN(roomId)) { res.status(400).json({ error: 'Invalid room id' }); return; }

    const body = z.object({ photos: z.array(PhotoSchema).min(1).max(20) }).parse(req.body);

    // If any photo is marked preview, clear previous preview flags first
    const hasPreview = body.photos.some(p => p.isPreview);
    if (hasPreview) {
      await prisma.roomPhoto.updateMany({ where: { roomId }, data: { isPreview: false } });
    }

    const created = await prisma.$transaction(
      body.photos.map((p, i) =>
        prisma.roomPhoto.create({
          data: {
            roomId,
            url: p.url,
            caption: p.caption ?? null,
            isPreview: p.isPreview ?? false,
            sortOrder: p.sortOrder ?? i,
          },
        })
      )
    );
    res.status(201).json(created);
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
      return;
    }
    console.error('[admin/rooms/photos/POST]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/admin/rooms/photos/:photoId  — update single photo (caption, isPreview, sortOrder)
roomsRouter.patch('/admin/photos/:photoId', requireAdmin, async (req, res) => {
  try {
    const photoId = parseInt(req.params.photoId);
    if (isNaN(photoId)) { res.status(400).json({ error: 'Invalid photo id' }); return; }

    const body = z.object({
      caption: z.string().max(120).optional().nullable(),
      isPreview: z.boolean().optional(),
      sortOrder: z.number().int().optional(),
    }).parse(req.body);

    // If setting as preview, clear other preview flags for same room first
    if (body.isPreview) {
      const photo = await prisma.roomPhoto.findUnique({ where: { id: photoId } });
      if (photo) {
        await prisma.roomPhoto.updateMany({ where: { roomId: photo.roomId }, data: { isPreview: false } });
      }
    }

    const updated = await prisma.roomPhoto.update({
      where: { id: photoId },
      data: body,
    });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Photo not found' }); return; }
    console.error('[admin/photos/PATCH]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/rooms/photos/:photoId
roomsRouter.delete('/admin/photos/:photoId', requireAdmin, async (req, res) => {
  try {
    const photoId = parseInt(req.params.photoId);
    if (isNaN(photoId)) { res.status(400).json({ error: 'Invalid photo id' }); return; }
    await prisma.roomPhoto.delete({ where: { id: photoId } });
    res.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025') { res.status(404).json({ error: 'Photo not found' }); return; }
    console.error('[admin/photos/DELETE]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
