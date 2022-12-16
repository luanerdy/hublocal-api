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
    @Body() data: Prisma.EmpresasUncheckedCreateInput,
  ) {
    const result = await this.empresasService.create(data);
    const code = 'error' in result ? 400 : 201;
    return response.status(code).send(result);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const result = await this.empresasService.findAll();
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const result = await this.empresasService.findOne(+id);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() data: Prisma.EmpresasUncheckedUpdateInput,
  ) {
    const result = await this.empresasService.update(+id, data);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    const result = await this.empresasService.remove(+id);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }
}
