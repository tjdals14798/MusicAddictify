import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinUsersDto } from './dto/join-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('join')
  async join(@Body() body: JoinUsersDto) {
    console.log('회원가입 요청', body);
    return { success: true, message: '회원가입 성공', data: body };
  }
}
