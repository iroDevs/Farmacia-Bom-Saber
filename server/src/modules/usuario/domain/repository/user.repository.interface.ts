import { User } from '../entity/user.entity';

export interface UserRepositoryInterface {
  save(user: User): Promise<void>;
}
