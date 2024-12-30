import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinAuthDto } from './dto/join-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('join')
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
    console.log(data);
    const {accessToken, refreshToken} = await this.authService.validateUser(data);
    
    // Access Token은 클라이언트에서 사용함
    res.cookie('jwt', accessToken, { httpOnly: true}); // 쿠키 설정
    // Refresh Token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/auth/refresh'
    });
  
    return { message: '로그인 성공' };
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    console.log("refresh 진입", refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token이 없습니다.');
    }

    const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
    console.log(newAccessToken, '컨트롤러')
    res.cookie('jwt', newAccessToken, { httpOnly: true});

    return { accessToken: newAccessToken };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) { //passthrough: true => json응답을 위해 작성 하는것
    res.clearCookie('jwt');
    res.clearCookie('refreshToken');
    return { message: '로그아웃 성공' };
  }
}
