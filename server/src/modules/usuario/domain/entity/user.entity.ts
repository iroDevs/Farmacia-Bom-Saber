export class User {
  constructor(
    public readonly nome: string,
    public readonly email: string,
  ) {}

  toPersistence() {
    return {
      nome: this.nome,
      email: this.email,
    };
  }
}
