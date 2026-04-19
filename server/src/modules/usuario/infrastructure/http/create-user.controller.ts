import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { CreateUserUseCase } from '../../application/create-user.usecase';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    await this.createUserUseCase.execute(data);
    return { message: 'Usuário criado com sucesso' };
  }
}
