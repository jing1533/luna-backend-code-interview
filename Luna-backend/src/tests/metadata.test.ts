import request from 'supertest';
import App from '@/app';
import { CreateMetadataDto } from '@dtos/metadata.dto';
import MetadataRoute from '@routes/metadata.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Metadata', () => {
  describe('[GET] /metadata', () => {
    it('response statusCode 200 / findAll', () => {
      const metadataRoute = new MetadataRoute();
      const app = new App([metadataRoute]);
      return request(app.getServer()).get(`${metadataRoute.path}`).expect(200);
    });
  });

  describe('[GET] /metadata/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const metadataId = 1;

      const metadataRoute = new MetadataRoute();
      const app = new App([metadataRoute]);
      return request(app.getServer()).get(`${metadataRoute.path}/${metadataId}`).expect(200);
    });
  });

  describe('[POST] /metadata', () => {
    it('response statusCode 201 / created', async () => {
      const metadataData: CreateMetadataDto = {
        description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
        external_url: 'https://openseacreatures.io/3',
        image: "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
        name: "Dave Starbelly",
        animation_url: ""
      };

      const metadataRoute = new MetadataRoute();
      const app = new App([metadataRoute]);
      return request(app.getServer()).post(`${metadataRoute.path}`).send(metadataData).expect(201);
    });
  });

  describe('[PUT] /metadata/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const metadataId = 1;
      const metadataData: CreateMetadataDto = {
        description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
        external_url: 'https://openseacreatures.io/3',
        image: "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
        name: "Dave Starbelly",
        animation_url: ""
      };

      const metadataRoute = new MetadataRoute();
      const app = new App([metadataRoute]);
      return request(app.getServer()).put(`${metadataRoute.path}/${metadataId}`).send(metadataData).expect(200);
    });
  });

  describe('[DELETE] /metadata/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const metadataId = 1;

      const metadataRoute = new MetadataRoute();
      const app = new App([metadataRoute]);
      return request(app.getServer()).delete(`${metadataRoute.path}/${metadataId}`).expect(200);
    });
  });
});
