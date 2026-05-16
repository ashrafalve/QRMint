import { Controller, Get, Param } from '@nestjs/common';
import { QrService } from './qr.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('QR System')
@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Generate QR code for a store slug' })
  async generate(@Param('slug') slug: string) {
    const qrDataUrl = await this.qrService.generateQrCode(slug);
    return { qrDataUrl };
  }
}
