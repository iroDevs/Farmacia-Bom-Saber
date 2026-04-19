import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { PrismaPromptIaRepository } from '../database/prisma/repository/prisma-prompt-ia.repository';
import { GenerateRelatorioUseCase } from '../../application/generate-relatorio.usecase';

@Module({
  controllers: [RelatorioController],
  providers: [
    {
      provide: 'PromptIaRepositoryInterface',
      useClass: PrismaPromptIaRepository,
    },
    GenerateRelatorioUseCase,
  ],
})
export class RelatorioModule {}
