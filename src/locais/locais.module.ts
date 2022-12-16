import { Module } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { LocaisController } from './locais.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LocaisController],
  providers: [LocaisService, PrismaService],
})
export class LocaisModule {}
