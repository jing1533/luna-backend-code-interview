import { IsString } from 'class-validator';

export class CreateMetadataDto {
  @IsString()
  public description: string;

  @IsString()
  public external_url: string;

  @IsString()
  public image: string;

  @IsString()
  public name: string;

  @IsString()
  public animation_url: string;
}
