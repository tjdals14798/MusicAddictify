import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // 하드코딩된 비밀번호
      database: 'postgres',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
