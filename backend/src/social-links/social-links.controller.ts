import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { UpsertSocialLinksDto } from './dto/upsert-social-links.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Social Links')
@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Post(':storeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add or update social links for a store' })
  upsert(
    @GetUser() user: any,
    @Param('storeId') storeId: string,
    @Body() upsertSocialLinksDto: UpsertSocialLinksDto,
  ) {
    return this.socialLinksService.upsert(user.id, storeId, upsertSocialLinksDto);
  }

  @Get(':storeId')
  @ApiOperation({ summary: 'Get social links for a store' })
  findOne(@Param('storeId') storeId: string) {
    return this.socialLinksService.findByStoreId(storeId);
  }
}
