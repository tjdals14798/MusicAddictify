import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinUsersDto } from './dto/join-users.dto';
import { LoginUsersDto } from './dto/login-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('join')
  async CreateUser(@Body() data: JoinUsersDto) {
    console.log('회원가입 요청', data);
    const user = await this.usersService.CreateUser(data);
    return user;
  }

  @Post('login')
  async validateUser(@Body() data: LoginUsersDto) {
    console.log('로그인 요청', data);
    const res = await this.usersService.validateUser(data);
    return res;
  }
}
