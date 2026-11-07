import { IUserRepository } from './repositories/user-repository.entities';
import { User } from '../domain/user.entities';

export class GetUserProfileUseCase {
    constructor(private readonly userRepo: IUserRepository) { }

    async execute(): Promise<User> {
        return await this.userRepo.getCurrentUser();
    }
}
