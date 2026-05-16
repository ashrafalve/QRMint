import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  async generateQrCode(slug: string): Promise<string> {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const publicUrl = `${frontendUrl}/store/${slug}`;
    
    try {
      // Generate QR code as a Data URL (base64)
      return await QRCode.toDataURL(publicUrl);
    } catch (err) {
      console.error('Failed to generate QR code', err);
      throw new Error('Failed to generate QR code');
    }
  }
}
