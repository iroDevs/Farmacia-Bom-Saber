import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserRepository } from '../repositories/create-user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: CreateUserRepository) {}

  async execute(data: CreateUserDto) {
    return this.repository.create(data);
  }
}
