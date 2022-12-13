import { Injectable } from '@nestjs/common';

@Injectable()
export class EmpresasService {
  create(createEmpresaDto: any) {
    return 'This action adds a new empresa';
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
