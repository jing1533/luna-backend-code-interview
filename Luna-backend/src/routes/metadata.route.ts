import { Router } from 'express';
import MetadataController from '@controllers/metadata.controller';
import { CreateMetadataDto } from '@dtos/metadata.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class MetadataRoute implements Routes {
  public path = '/metadata';
  public router = Router();
  public metadataController = new MetadataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.metadataController.getMetadata);
    this.router.get(`${this.path}/:id(\\d+)`, this.metadataController.getMetadataById);
    this.router.post(`${this.path}`, validationMiddleware(CreateMetadataDto, 'body'), this.metadataController.createMetadata);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateMetadataDto, 'body', true), this.metadataController.updateMetadata);
    this.router.delete(`${this.path}/:id(\\d+)`, this.metadataController.deleteMetadata);
  }
}

export default MetadataRoute;
