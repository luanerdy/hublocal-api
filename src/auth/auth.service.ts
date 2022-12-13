import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async cadastrar(data: Prisma.UsersCreateInput) {
    try {
      const password = await bcrypt.hash(data.senha, 10);
      data.senha = password;

      const result = await this.prisma.users.create({
        data,
      });

      delete result.senha;
      delete result.id;

      return result;
    } catch (err) {
      return {
        error: 'Email já cadastrado!',
      };
    }
  }

  async getSession(user: Users) {
    try {
      const session = await this.prisma.sessions.findUnique({
        where: {
          userId: user.id,
        },
      });

      const token = session?.token;
      token && jwt.verify(token, process.env.JWT_SECRET);

      return token;
    } catch (err) {
      await this.prisma.sessions.delete({
        where: {
          userId: user.id,
        },
      });
      return undefined;
    }
  }

  async createSession(user: Users) {
    const token = jwt.sign(
      {
        data: {
          email: user.email,
          nome: user.nome,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    await this.prisma.sessions.create({
      data: {
        userId: user.id,
        token,
      },
    });

    return token;
  }

  async entrar(data: Partial<Users>) {
    const incorrectData = {
      error: 'Dados incorretos!',
    };

    try {
      const user = await this.prisma.users.findUnique({
        where: { email: data.email },
      });

      if (user === null) return incorrectData;

      const isPasswordRight = await bcrypt.compare(data.senha, user.senha);

      if (!isPasswordRight) return incorrectData;

      const token =
        (await this.getSession(user)) ?? (await this.createSession(user));

      return {
        message: 'Login efetuado com sucesso!',
        token,
      };
    } catch (err) {
      console.log(err);
      return incorrectData;
    }
  }

  async sair(token: string) {
    try {
      const session = await this.prisma.sessions.findFirst({
        where: {
          token,
        },
      });

      await this.prisma.sessions.delete({
        where: {
          id: session?.id,
        },
      });

      return {
        message: 'Logout efetuado com sucesso',
      };
    } catch (err) {
      return {
        error: 'Sessão não encontrada',
      };
    }
  }
}
