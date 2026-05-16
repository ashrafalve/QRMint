import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateStoreDto) {
    const existingStore = await this.prisma.store.findUnique({ where: { slug: dto.slug } });
    if (existingStore) {
      throw new BadRequestException('Slug already taken');
    }

    return this.prisma.store.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.store.findMany({
      where: { userId },
      include: { socialLinks: true },
    });
  }

  async findOneBySlug(slug: string) {
    const store = await this.prisma.store.findUnique({
      where: { slug },
      include: { socialLinks: true },
    });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  async update(userId: string, id: string, dto: UpdateStoreDto) {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store || store.userId !== userId) {
      throw new NotFoundException('Store not found or unauthorized');
    }

    if (dto.slug && dto.slug !== store.slug) {
      const existing = await this.prisma.store.findUnique({ where: { slug: dto.slug } });
      if (existing) {
        throw new BadRequestException('Slug already taken');
      }
    }

    return this.prisma.store.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store || store.userId !== userId) {
      throw new NotFoundException('Store not found or unauthorized');
    }

    return this.prisma.store.delete({ where: { id } });
  }
}
