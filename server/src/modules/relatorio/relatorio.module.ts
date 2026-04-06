import { Module } from '@nestjs/common';
import { RelatorioController } from './controller/relatorio.controller';
import { RelatorioService } from './usecase/relatorio.service';
import { PromptIaRepository } from './repositories/prompt-ia.repository';

@Module({
  controllers: [RelatorioController],
  providers: [RelatorioService, PromptIaRepository],
})
export class RelatorioModule {}
