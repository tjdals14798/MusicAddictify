import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinAuthDto } from './dto/join-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() data: JoinAuthDto) {
    console.log(data);
    const res = await this.authService.createUser(data);
    return res;
  }

  @Post('login')
  async validateUser(
    @Body() data: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(data);

    if (!user)
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');

    // Access Token 발급
    const accessToken = await this.authService.generateAccessToken(user);

    // Refresh Token 발급 및 쿠키 설정
    const refreshToken = await this.authService.generateRefreshToken(user.id);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 전송
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    return { accessToken };
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token not found'); //찾을 수 없음
    }

    try {
      const payload = this.authService.verifyRefreshToken(refreshToken);
      const newAccessToken =
        await this.authService.generateAccessToken(payload);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid Refresh Token'); //유효하지 않음
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    //passthrough: true => json응답을 위해 작성 하는것
    res.clearCookie('jwt');
    res.clearCookie('refreshToken');
    return { message: '로그아웃 성공' };
  }
}
