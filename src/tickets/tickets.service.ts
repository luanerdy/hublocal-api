import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { errorMessage } from 'src/utils';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TicketsUncheckedCreateInput) {
    try {
      const result = await this.prisma.tickets.create({
        data,
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.tickets.findMany();

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.tickets.findUnique({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async update(id: number, data: Prisma.TicketsUncheckedUpdateInput) {
    try {
      const result = await this.prisma.tickets.update({
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
      const result = await this.prisma.tickets.delete({
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
