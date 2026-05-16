import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpsertSocialLinksDto {
  @ApiPropertyOptional({ example: 'https://facebook.com/mystore' })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/mystore' })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({ example: 'https://mystore.com' })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/company/mystore' })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({ example: 'https://tiktok.com/@mystore' })
  @IsString()
  @IsOptional()
  tiktok?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/@mystore' })
  @IsString()
  @IsOptional()
  youtube?: string;

  @ApiPropertyOptional({ example: 'https://wa.me/1234567890' })
  @IsString()
  @IsOptional()
  whatsapp?: string;
}
