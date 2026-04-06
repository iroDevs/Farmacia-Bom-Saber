import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from '../../usecase/create-user.service';
import { CreateUserDto } from '../../dto/create-user.dto';

@Controller('usuarios')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post()
  async handle(@Body() dto: CreateUserDto) {
    return this.service.execute(dto);
  }
}
