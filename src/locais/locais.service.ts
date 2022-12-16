import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { errorMessage } from 'src/utils';

@Injectable()
export class LocaisService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LocaisUncheckedCreateInput) {
    try {
      const result = await this.prisma.locais.create({
        data,
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.locais.findMany();

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.locais.findUnique({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async update(id: number, data: Prisma.LocaisUncheckedUpdateInput) {
    try {
      const result = await this.prisma.locais.update({
        where: {
          id,
        },
        data,
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.locais.delete({
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
