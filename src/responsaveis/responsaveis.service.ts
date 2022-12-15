import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { errorMessage } from 'src/utils';

@Injectable()
export class ResponsaveisService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ResponsaveisCreateInput) {
    try {
      const result = await this.prisma.responsaveis.create({
        data,
      });

      return result;
    } catch (err) {
      return errorMessage('Não foi possível cadastrar o responsavel');
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.responsaveis.findMany();

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.responsaveis.findUnique({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async update(id: number, data: any) {
    try {
      const result = await this.prisma.responsaveis.update({
        where: {
          id,
        },
        data,
      });

      return result;
    } catch (err) {
      return errorMessage('Não foi possível alterar o responsavel');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.responsaveis.delete({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }
}
