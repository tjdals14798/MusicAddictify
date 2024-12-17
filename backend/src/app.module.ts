import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: '127.0.0.1',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres', // 하드코딩된 비밀번호
    //   database: 'postgres',
    //   entities: [],
    //   synchronize: true,
    // }),
    UsersModule,
    PrismaModule,
  ],
})
export class AppModule {}
