import { Module } from '@nestjs/common';
import { PrismaUserRepository } from '../database/prisma/repository/prisma-user.repository';
import { CreateUserUseCase } from '../../application/create-user.usecase';
import { CreateUserController } from './create-user.controller';

@Module({
  controllers: [CreateUserController],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
  ],
})
export class UserModule {}
