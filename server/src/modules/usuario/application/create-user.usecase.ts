import { UserRepositoryInterface } from '../domain/repository/user.repository.interface';
import { User } from '../domain/entity/user.entity';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(data: { nome: string; email: string }) {
    const user = new User(data.nome, data.email);
    await this.userRepository.save(user);
  }
}
