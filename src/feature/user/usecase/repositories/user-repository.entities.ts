import { User } from '../../domain/user.entities';

export interface IUserRepository {
    getCurrentUser(): Promise<User>;
}
