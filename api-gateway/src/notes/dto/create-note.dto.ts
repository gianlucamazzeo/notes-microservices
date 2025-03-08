import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Titolo della nota' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Contenuto della nota...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: ['lavoro', 'importante'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
