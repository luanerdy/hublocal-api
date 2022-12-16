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
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() data: Prisma.TicketsUncheckedCreateInput,
  ) {
    const result = await this.ticketsService.create(data);
    const code = 'error' in result ? 409 : 201;
    return response.status(code).send(result);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const result = await this.ticketsService.findAll();
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const result = await this.ticketsService.findOne(+id);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() data: Prisma.TicketsUncheckedUpdateInput,
  ) {
    const result = await this.ticketsService.update(+id, data);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    const result = await this.ticketsService.remove(+id);
    const code = 'error' in result ? 400 : 200;
    return response.status(code).send(result);
  }
}
