import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindNotesQueryDto {
  @ApiProperty({ required: false, example: 'progetto' })
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @ApiProperty({ required: false, example: 'lavoro' })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({
    required: false,
    enum: ['createdAt', 'updatedAt', 'title'],
    default: 'updatedAt',
  })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'], default: 'desc' })
  @IsString()
  @IsOptional()
  sortOrder?: string;
}
