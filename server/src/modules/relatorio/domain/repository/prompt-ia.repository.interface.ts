import { Relatorio } from '../entity/relatorio.entity';

export interface PromptIaRepositoryInterface {
  save(relatorio: Relatorio): Promise<any>;
}
