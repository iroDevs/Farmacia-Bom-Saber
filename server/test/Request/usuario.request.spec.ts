import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Usuario (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/usuarios (POST) -> should create and return user', async () => {
    const payload = { name: 'Joao', email: 'joao@example.com' };
    const res = await request(app.getHttpServer()).post('/usuarios').send(payload).expect(201);
    expect(res.body).toMatchObject({ id: expect.any(Number), name: payload.name, email: payload.email });
  });

  it('/usuarios (GET) -> should return array with created user', async () => {
    const res = await request(app.getHttpServer()).get('/usuarios').expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('/usuarios/:id (GET) -> should return a user by id', async () => {
    const list = await request(app.getHttpServer()).get('/usuarios').expect(200);
    const id = list.body[0].id;
    const res = await request(app.getHttpServer()).get(`/usuarios/${id}`).expect(200);
    expect(res.body).toHaveProperty('id', id);
  });
});