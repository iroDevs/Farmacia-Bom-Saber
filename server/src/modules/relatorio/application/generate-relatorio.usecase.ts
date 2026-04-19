import { PromptIaRepositoryInterface } from '../domain/repository/prompt-ia.repository.interface';
import { Relatorio } from '../domain/entity/relatorio.entity';

export class GenerateRelatorioUseCase {
  constructor(private readonly promptRepo: PromptIaRepositoryInterface) {}

  async execute(data: { prompt: string; id_usuario?: number }) {
    const relatorio = new Relatorio(data.prompt, data.id_usuario);
    return this.promptRepo.save(relatorio);
  }
}
