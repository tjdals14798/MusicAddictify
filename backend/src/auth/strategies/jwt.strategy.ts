import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰 추출
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // .env의 JWT_SECRET 사용
    });
  }

  async validate(payload: any) {
    // 토큰이 유효하면 payload 리턴
    return { id: payload.id, name: payload.name };
  }
}
