import { Controller, Post, Body } from '@nestjs/common';
import { RelatorioService } from '../usecase/relatorio.service';
import { CreateRelatorioDto } from '../dto/create-relatorio.dto';

@Controller('relatorios')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Post()
  async create(@Body() dto: CreateRelatorioDto) {
    return this.relatorioService.generateReport(dto);
  }
}
