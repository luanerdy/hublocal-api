import { Injectable } from '@nestjs/common';

@Injectable()
export class LocaisService {
  create(createLocaiDto: any) {
    return 'This action adds a new locai';
  }

  findAll() {
    return `This action returns all locais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locai`;
  }

  update(id: number, updateLocaiDto: any) {
    return `This action updates a #${id} locai`;
  }

  remove(id: number) {
    return `This action removes a #${id} locai`;
  }
}
