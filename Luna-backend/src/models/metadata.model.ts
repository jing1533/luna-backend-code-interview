import { Model, ModelObject } from 'objection';
import { Metadatum } from '@interfaces/metadata.interface';

export class Metadata extends Model implements Metadatum {
  id!: number;
  description!: string;
  external_url!: string;
  image!: string;
  name!: string;
  animation_url!: string;

  static tableName = 'metadata'; // database table name
  static idColumn = 'id'; // id column name
}

export type MetadataShape = ModelObject<Metadata>;
