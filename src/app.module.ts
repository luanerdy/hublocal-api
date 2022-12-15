import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresasModule } from './empresas/empresas.module';
import { LocaisModule } from './locais/locais.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';
import { ResponsaveisModule } from './responsaveis/responsaveis.module';

@Module({
  imports: [
    EmpresasModule,
    LocaisModule,
    TicketsModule,
    AuthModule,
    ResponsaveisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
