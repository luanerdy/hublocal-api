import { Controller, Post, Body, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, Users } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/cadastrar')
  async cadastrar(
    @Res() response: Response,
    @Body() data: Prisma.UsersCreateInput,
  ) {
    const result = await this.authService.cadastrar(data);
    const code = 'error' in result ? 409 : 201;
    return response.status(code).send(result);
  }

  @Post('/entrar')
  async entrar(@Res() response: Response, @Body() data: Partial<Users>) {
    const result = await this.authService.entrar(data);
    const code = 'error' in result ? 404 : 201;
    return response.status(code).send(result);
  }

  @Delete('/sair')
  async sair(@Res() response: Response, @Body() data: { token: string }) {
    const result = await this.authService.sair(data.token);
    const code = 'error' in result ? 404 : 200;
    return response.status(code).send(result);
  }
}
