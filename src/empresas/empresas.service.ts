import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { errorMessage } from 'src/utils';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EmpresasCreateInput) {
    try {
      const result = await this.prisma.empresas.create({
        data,
      });

      delete result.id;

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  findAll() {
    return `This action returns all empresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: any) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
