import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import { prisma } from '../db/prisma.js';

describe('Room Listings & Multi-Photo Management', () => {
  let adminToken: string;
  let testRoomId: number;
  let photo1Id: number;
  let photo2Id: number;

  beforeAll(async () => {
    // Log in as admin to get auth token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@87ahangama.com', password: 'cafe87admin' });
    adminToken = loginRes.body.token;
  });

  it('1. GET /api/rooms returns active rooms with photo array and preview images', async () => {
    const res = await request(app).get('/api/rooms');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);

    const sunRoom = res.body.find((r: any) => r.slug === 'sun-room');
    expect(sunRoom).toBeDefined();
    expect(sunRoom.name).toBe('Sun Room');
    expect(sunRoom.photos.length).toBeGreaterThan(0);
  });

  it('2. GET /api/rooms/:slug returns single room details with full gallery', async () => {
    const res = await request(app).get('/api/rooms/moon-room');
    expect(res.status).toBe(200);
    expect(res.body.slug).toBe('moon-room');
    expect(res.body.name).toBe('Moon Room');
    expect(Array.isArray(res.body.photos)).toBe(true);
    expect(res.body.features.length).toBeGreaterThan(0);
  });

  it('3. POST /api/rooms/admin creates a new boutique room listing', async () => {
    const newRoomPayload = {
      slug: 'villa-ocean-suite-test',
      name: 'Ocean View Villa Suite',
      subtitle: 'Luxury Private Terrace Suite',
      description: 'Expansive private master suite with open balcony and plunge pool.',
      price: 'From $45',
      pricePeriod: 'per night',
      size: '220 sq ft',
      capacity: '2 Guests',
      bed: '1 King Bed',
      view: 'Ocean & Sunset View',
      bookingUrl: 'https://www.booking.com/example',
      agodaUrl: 'https://www.agoda.com/example',
      highlights: ['Free Breakfast', 'Ocean Terrace'],
      features: ['Air conditioning', 'King size bed', 'Artisanal bathroom'],
      isActive: true,
      sortOrder: 99,
    };

    const res = await request(app)
      .post('/api/rooms/admin')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newRoomPayload);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.slug).toBe('villa-ocean-suite-test');
    expect(res.body.name).toBe('Ocean View Villa Suite');
    testRoomId = res.body.id;
  });

  it('4. PUT /api/rooms/admin/:id updates room details and pricing', async () => {
    const res = await request(app)
      .put(`/api/rooms/admin/${testRoomId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        price: 'From $50',
        subtitle: 'Updated Suite Subtitle',
      });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe('From $50');
    expect(res.body.subtitle).toBe('Updated Suite Subtitle');
  });

  it('5. POST /api/rooms/admin/:id/photos adds multiple photos to the room', async () => {
    const photosPayload = [
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        caption: 'Master Bed Front',
        isPreview: true, // initial preview photo
        sortOrder: 0,
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        caption: 'Private Balcony Sunset',
        isPreview: false,
        sortOrder: 1,
      },
    ];

    const res = await request(app)
      .post(`/api/rooms/admin/${testRoomId}/photos`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ photos: photosPayload });

    expect(res.status).toBe(201);
    expect(res.body.length).toBe(2);
    expect(res.body[0].caption).toBe('Master Bed Front');
    expect(res.body[0].isPreview).toBe(true);
    photo1Id = res.body[0].id;
    photo2Id = res.body[1].id;
  });

  it('6. PATCH /api/rooms/admin/photos/:photoId switches preview photo and clears other previews', async () => {
    // Set photo 2 as preview photo
    const res = await request(app)
      .patch(`/api/rooms/admin/photos/${photo2Id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isPreview: true });

    expect(res.status).toBe(200);
    expect(res.body.isPreview).toBe(true);

    // Verify photo 1 is no longer preview in DB
    const oldPhoto1 = await prisma.roomPhoto.findUnique({ where: { id: photo1Id } });
    expect(oldPhoto1?.isPreview).toBe(false);
  });

  it('7. PATCH /api/rooms/admin/photos/:photoId updates photo caption', async () => {
    const res = await request(app)
      .patch(`/api/rooms/admin/photos/${photo1Id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ caption: 'Updated Earthen Bathroom' });

    expect(res.status).toBe(200);
    expect(res.body.caption).toBe('Updated Earthen Bathroom');
  });

  it('8. DELETE /api/rooms/admin/photos/:photoId deletes a single photo', async () => {
    const res = await request(app)
      .delete(`/api/rooms/admin/photos/${photo1Id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const check = await prisma.roomPhoto.findUnique({ where: { id: photo1Id } });
    expect(check).toBeNull();
  });

  it('9. DELETE /api/rooms/admin/:id deletes room and cascades all associated photos', async () => {
    const res = await request(app)
      .delete(`/api/rooms/admin/${testRoomId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const checkRoom = await prisma.room.findUnique({ where: { id: testRoomId } });
    expect(checkRoom).toBeNull();

    const checkPhoto = await prisma.roomPhoto.findUnique({ where: { id: photo2Id } });
    expect(checkPhoto).toBeNull();
  });
});
