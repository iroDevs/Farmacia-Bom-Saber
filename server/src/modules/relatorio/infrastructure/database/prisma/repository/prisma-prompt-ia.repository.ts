import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../shared/prisma/prisma.service';
import { PromptIaRepositoryInterface } from '../../../domain/repository/prompt-ia.repository.interface';
import { Relatorio } from '../../../domain/entity/relatorio.entity';

@Injectable()
export class PrismaPromptIaRepository implements PromptIaRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async save(relatorio: Relatorio) {
    return this.prisma.proptsIa.create({
      data: relatorio.toPersistence(),
    });
  }
}
