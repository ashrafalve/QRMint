import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertSocialLinksDto } from './dto/upsert-social-links.dto';

@Injectable()
export class SocialLinksService {
  constructor(private prisma: PrismaService) {}

  async upsert(userId: string, storeId: string, dto: UpsertSocialLinksDto) {
    const store = await this.prisma.store.findUnique({ where: { id: storeId } });
    if (!store || store.userId !== userId) {
      throw new NotFoundException('Store not found or unauthorized');
    }

    return this.prisma.socialLink.upsert({
      where: { storeId },
      update: dto,
      create: {
        ...dto,
        storeId,
      },
    });
  }

  async findByStoreId(storeId: string) {
    return this.prisma.socialLink.findUnique({ where: { storeId } });
  }
}
