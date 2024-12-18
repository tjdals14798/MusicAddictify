import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinUsersDto } from './dto/join-users.dto';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { LoginUsersDto } from './dto/login-users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async CreateUser(data: JoinUsersDto) {
    const hashedPassword = await bcrypt.hash(data.pw, 10);

    const user = await this.prisma.user.create({
      data: {
        id: data.id,
        password: hashedPassword,
        name: data.name,
        birthDate: dayjs(data.birthDate).toDate(),
      },
    });

    console.log('User save', user);
    return user;
  }

  async validateUser(data: LoginUsersDto) {
    console.log(data);
    const user = await this.prisma.user.findUnique({ where: { id: data.id } });
    if (!user)
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');

    const isPasswordValid = await bcrypt.compare(data.pw, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');

    return { id: user.id, name: user.name };
  }
}
