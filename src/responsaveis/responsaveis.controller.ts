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
import { ResponsaveisService } from './responsaveis.service';

@Controller('responsaveis')
export class ResponsaveisController {
  constructor(private readonly responsaveisService: ResponsaveisService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() data: Prisma.ResponsaveisCreateInput,
  ) {
    const result = await this.responsaveisService.create(data);
    const code = 'error' in result ? 409 : 201;
    return response.status(code).send(result);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const result = await this.responsaveisService.findAll();
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const result = await this.responsaveisService.findOne(+id);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() data: Prisma.ResponsaveisUpdateInput,
  ) {
    const result = await this.responsaveisService.update(+id, data);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    const result = await this.responsaveisService.remove(+id);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }
}
