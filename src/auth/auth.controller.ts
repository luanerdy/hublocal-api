import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/cadastrar')
  cadastrar(@Body() userData: Data) {
    return this.authService.cadastrar(userData);
  }

  @Post('/entrar')
  entrar(@Body() userData: Data) {
    return this.authService.entrar(userData);
  }

  @Delete('/sair/:token')
  sair(@Param('token') token: string) {
    return this.authService.sair(+token);
  }
}
