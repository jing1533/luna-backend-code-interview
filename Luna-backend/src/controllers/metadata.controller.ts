import { NextFunction, Request, Response } from 'express';
import { CreateMetadataDto } from '@dtos/metadata.dto';
import { Metadatum } from '@interfaces/metadata.interface';
import metadataService from '@services/metadata.service';

class MetadataController {
  public metadataService = new metadataService();

  public getMetadata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMetadataData: Metadatum[] = await this.metadataService.findAllMetadata();

      res.status(200).json({ data: findAllMetadataData });
    } catch (error) {
      next(error);
    }
  };

  public getMetadataById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metadataId = Number(req.params.id);
      const findOneMetadataData: Metadatum = await this.metadataService.findMetadataById(metadataId);

      res.status(200).json({ data: findOneMetadataData });
    } catch (error) {
      next(error);
    }
  };

  public createMetadata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metadatData: CreateMetadataDto = req.body;
      const createMetadataData: Metadatum = await this.metadataService.createMetadata(metadatData);

      res.status(201).json({ data: createMetadataData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMetadata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metadataId = Number(req.params.id);
      const metadataData: Metadatum = req.body;
      const updateMetadataData: Metadatum = await this.metadataService.updateMetadata(metadataId, metadataData);

      res.status(200).json({ data: updateMetadataData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMetadata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metadataId = Number(req.params.id);
      const deleteMetadataData: Metadatum = await this.metadataService.deleteMetadata(metadataId);

      res.status(200).json({ data: deleteMetadataData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default MetadataController;
