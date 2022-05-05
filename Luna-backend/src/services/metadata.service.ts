import { hash } from 'bcrypt';
import { CreateMetadataDto } from '@dtos/metadata.dto';
import { HttpException } from '@exceptions/HttpException';
import { Metadatum } from '@interfaces/metadata.interface';
import { Metadata } from '@models/metadata.model';
import { isEmpty } from '@utils/util';

class MetadataService {
  public async findAllMetadata(): Promise<Metadatum[]> {
    const metadata: Metadatum[] = await Metadata.query().select().from('metadata');
    return metadata;
  }

  public async findMetadataById(metadataId: number): Promise<Metadatum> {
    const findMetadata: Metadatum = await Metadata.query().findById(metadataId);
    if (!findMetadata) throw new HttpException(409, "Invalid metdata id");

    return findMetadata;
  }

  public async createMetadata(metadataData: CreateMetadataDto): Promise<Metadatum> {
    if (isEmpty(metadataData)) throw new HttpException(400, "Invalid metdata");

    const createMetadataData: Metadatum = await Metadata.query()
      .insert(metadataData)
      .into('metadata');

    return createMetadataData;
  }

  public async updateMetadata(metadataId: number, metadataData: Metadatum): Promise<Metadatum> {
    if (isEmpty(metadataData)) throw new HttpException(400, "Invalid metdata");

    const findMetadata: Metadatum[] = await Metadata.query().select().from('metadata').where('id', '=', metadataId);
    if (!findMetadata) throw new HttpException(409, "Invalid metdata id");

    await Metadata.query()
      .update(metadataData)
      .where('id', '=', metadataId)
      .into('metadata');

    const updateMetadataData: Metadatum = await Metadata.query().select().from('metadata').where('id', '=', metadataId).first();
    return updateMetadataData;
  }

  public async deleteMetadata(metadataId: number): Promise<Metadatum> {
    const findUser: Metadatum = await Metadata.query().select().from('metadata').where('id', '=', metadataId).first();
    if (!findUser) throw new HttpException(409, "Invalid metdata id");

    await Metadata.query().delete().where('id', '=', metadataId).into('metadata');
    return findUser;
  }
}

export default MetadataService;
