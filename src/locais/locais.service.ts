import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { errorMessage } from 'src/utils';

@Injectable()
export class LocaisService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LocaisUncheckedCreateInput) {
    try {
      const result = await this.prisma.locais.create({
        data,
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.locais.findMany();

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.locais.findUnique({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      return errorMessage();
    }
  }

  async update(
    id: number,
    data: Prisma.LocaisUncheckedUpdateInput & {
      ticket: Prisma.TicketsUncheckedUpdateInput;
    },
  ) {
    try {
      const local = await this.prisma.locais.update({
        where: {
          id,
        },
        data: Object.fromEntries(
          Object.entries(data).filter((e) => e[0] !== 'ticket'),
        ),
      });

      const prevTicket = await this.prisma.tickets.findFirst({
        where: {
          localId: local.id,
          AND: {
            NOT: {
              status: 'concluido',
            },
          },
        },
      });

      const ticket = await this.prisma.tickets.upsert({
        create: {
          localId: local.id,
          localEndereco: local.endereco,
          localNome: local.nome,
          localEmpresa: local.empresaId,
          localResponsavelPrincipal: local.responsavelPrincipal,
          status: data.ticket.status,
          titulo: data.ticket.titulo,
          criadoPor: data.ticket.criadoPor,
          atendidoPor: data.ticket.atendidoPor,
        } as Prisma.TicketsUncheckedCreateInput,
        update: {
          localEndereco: local.endereco,
          localNome: local.nome,
          localEmpresa: local.empresaId,
          localResponsavelPrincipal: local.responsavelPrincipal,
        } as Prisma.TicketsUncheckedUpdateInput,
        where: {
          id: prevTicket?.id ?? 0,
        },
      });

      return { local, ticket };
    } catch (err) {
      console.log(err);
      return errorMessage();
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.locais.delete({
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
