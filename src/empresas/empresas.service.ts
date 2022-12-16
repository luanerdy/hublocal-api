import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { errorMessage } from 'src/utils';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EmpresasUncheckedCreateInput) {
    try {
      const result = await this.prisma.empresas.create({
        data,
      });

      return result;
    } catch (err) {
      console.log(err);
      return errorMessage('Não foi possível criar a empresa');
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.empresas.findMany();

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.empresas.findUnique({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async update(id: number, data: Prisma.EmpresasUncheckedUpdateInput) {
    try {
      const result = await this.prisma.empresas.update({
        where: {
          id,
        },
        data,
      });

      return result;
    } catch (err) {
      console.log(err);
      return errorMessage();
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.empresas.delete({
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
