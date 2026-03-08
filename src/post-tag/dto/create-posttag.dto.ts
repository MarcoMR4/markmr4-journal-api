import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
