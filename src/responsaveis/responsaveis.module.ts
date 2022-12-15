import { Module } from '@nestjs/common';
import { ResponsaveisService } from './responsaveis.service';
import { ResponsaveisController } from './responsaveis.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ResponsaveisController],
  providers: [ResponsaveisService, PrismaService],
})
export class ResponsaveisModule {}
