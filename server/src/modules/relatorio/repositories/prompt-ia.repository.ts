import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class PromptIaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { id_usuario?: number; prompt: string }) {
    return this.prisma.proptsIa.create({
      data: {
        id_usuario: data.id_usuario ?? null,
        prompt: data.prompt,
      },
    });
  }
}
