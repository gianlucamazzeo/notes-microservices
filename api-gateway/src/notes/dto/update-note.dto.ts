import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({ example: 'Nuovo titolo', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Nuovo contenuto', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: ['lavoro', 'importante'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;
}