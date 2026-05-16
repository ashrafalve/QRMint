import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiPropertyOptional({ example: 'Updated Store Name' })
  @IsString()
  @IsOptional()
  storeName?: string;

  @ApiPropertyOptional({ example: 'updated-slug' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional({ example: 'Fashion' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'light' })
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiPropertyOptional({ example: '+0987654321' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'new-email@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '456 New St, City, Country' })
  @IsString()
  @IsOptional()
  address?: string;
}
