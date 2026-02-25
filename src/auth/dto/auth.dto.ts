import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class signInDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}
