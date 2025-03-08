import { IsOptional, IsString } from 'class-validator';

export class FindNotesDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  searchTerm?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsString()
  @IsOptional()
  sortBy?: 'createdAt' | 'updatedAt' | 'title';

  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
