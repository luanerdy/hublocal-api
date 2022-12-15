import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { EmpresasService } from './empresas.service';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() data: Prisma.EmpresasCreateInput,
  ) {
    const result = await this.empresasService.create(data);
    const code = 'error' in result ? 409 : 201;
    return response.status(code).send(result);
  }

  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: any) {
    return this.empresasService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasService.remove(+id);
  }
}
