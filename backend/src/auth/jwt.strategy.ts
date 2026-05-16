import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-key-123-fixed',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      console.log('User not found for sub:', payload.sub);
      throw new UnauthorizedException();
    }
    console.log('User validated:', user.email);
    return user;
  }
}
