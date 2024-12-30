import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinAuthDto } from './dto/join-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtservice: JwtService,
  ) {}

  async createUser(data: JoinAuthDto) {
    const hashedPassword = await bcrypt.hash(data.pw, 10);

    const user = await this.prisma.user.create({
      data: {
        id: data.id,
        password: hashedPassword,
        name: data.name,
        birthDate: dayjs(data.birthDate).toDate(),
      },
    });
    console.log('User Save', user);
    return user;
  }

  async validateUser(data: LoginAuthDto) {
    console.log('로그인 진입: ', data);
    const user = await this.prisma.user.findUnique({ where: { id: data.id } });
    if (!user)
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');

    const isPasswordValid = await bcrypt.compare(data.pw, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    // JWT 토큰 발급
    const accessToken = this.jwtservice.sign(
      {id: user.id, name: user.name},
      {secret: process.env.JWT_SECRET, expiresIn: '3m'}
    )

    const refreshToken = this.jwtservice.sign(
      {id: user.id, name: user.name},
      {secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d'}
    )

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    console.log("refresh 진입")
    try {
      const payload = this.jwtservice.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      console.log('payload: ', payload)
      const newAccessToken = this.jwtservice.sign(
        { id: payload.id, name: payload.name },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' },
      );

      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
    }
  }
}
