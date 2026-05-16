import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new store' })
  create(@GetUser() user: any, @Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(user.id, createStoreDto);
  }

  @Get('my-stores')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all stores of the authenticated user' })
  findAll(@GetUser() user: any) {
    return this.storesService.findAll(user.id);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get public store by slug' })
  findOne(@Param('slug') slug: string) {
    return this.storesService.findOneBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a store' })
  update(@GetUser() user: any, @Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(user.id, id, updateStoreDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a store' })
  remove(@GetUser() user: any, @Param('id') id: string) {
    return this.storesService.remove(user.id, id);
  }
}
