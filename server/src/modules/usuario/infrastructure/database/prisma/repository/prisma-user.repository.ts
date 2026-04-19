import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../shared/prisma/prisma.service';
import { UserRepositoryInterface } from '../../../domain/repository/user.repository.interface';
import { User } from '../../../domain/entity/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.usuario.create({ data: user.toPersistence() });
  }
}
