import { Body, Controller, Post } from '@nestjs/common';
import { CreateRelatorioDto } from './create-relatorio.dto';
import { GenerateRelatorioUseCase } from '../../application/generate-relatorio.usecase';

@Controller('relatorios')
export class RelatorioController {
  constructor(private readonly generateRelatorioUseCase: GenerateRelatorioUseCase) {}

  @Post()
  async create(@Body() dto: CreateRelatorioDto) {
    return this.generateRelatorioUseCase.execute(dto);
  }
}
