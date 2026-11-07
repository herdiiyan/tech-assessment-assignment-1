import { IUserRepository } from '../usecase/repositories/user-repository.entities';
import { User } from '../domain/user.entities';
import { MOCK_USER } from './mock-user.data';

export class MockUserRepository implements IUserRepository {
    async getCurrentUser(): Promise<User> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ...MOCK_USER });
            }, 450);
        });
    }
}
