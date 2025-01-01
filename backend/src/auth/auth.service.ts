import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const checkuser = await this.prisma.user.findFirst({
      where: { id: data.id },
    });

    if (checkuser) {
      throw new BadRequestException('이미 가입된 ID입니다.');
    }

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

  async validateUser(data: LoginAuthDto): Promise<any> {
    console.log('로그인 진입: ', data);
    const user = await this.prisma.user.findUnique({ where: { id: data.id } });
    if (!user) null;

    const isPasswordValid = await bcrypt.compare(data.pw, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');

    return user;
  }

  async generateAccessToken(user: any): Promise<string> {
    const payload = { id: user.id, name: user.name };
    return this.jwtservice.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { id: userId };
    return this.jwtservice.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtservice.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
