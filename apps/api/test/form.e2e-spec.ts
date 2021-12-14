import { CanActivate, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { DatabaseModule } from 'src/database/database.module';
import { FormService } from 'src/form/form.service';
import * as MockedFormPayload from './mocks/form-payload.mock.json';
import { FormEntity } from 'src/form/entity/form.entity';
import { FormModule } from 'src/form/form.module';
import { AppModule } from 'src/app.module';

describe('FormController (e2e)', () => {
  let app: INestApplication;
  let formService: FormService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, FormModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    formService = app.get<FormService>(FormService);
  }, 10000);

  afterAll(async () => {
    await app.close();
  });

  it('/Forms (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/form')
      .send(MockedFormPayload)
      .expect(201)
      .then(res => {
        expect(res.body).toBeInstanceOf(FormEntity);
      });
  });
});
