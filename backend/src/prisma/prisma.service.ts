import { Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      this.$connect();

      this.logger.log(`Prisma client connected: ${process.env.DATABASE_URL}`);
    } catch (error) {
      this.logger.error(`Prisma client error: ${error.message}`);
    }
  }
}
