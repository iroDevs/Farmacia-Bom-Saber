export class Relatorio {
  constructor(
    public readonly prompt: string,
    public readonly id_usuario?: number,
  ) {}

  toPersistence() {
    return {
      prompt: this.prompt,
      id_usuario: this.id_usuario ?? null,
    };
  }
}
