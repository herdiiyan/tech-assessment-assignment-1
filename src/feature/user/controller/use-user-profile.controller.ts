'use client';

import { useState, useEffect } from 'react';
import { User } from '../domain/user.entities';
import { GetUserProfileUseCase } from '../usecase/get-user-profile.usecase';
import { MockUserRepository } from '../infranstructure/mock-user.repository';

const userRepository = new MockUserRepository();
const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);

export function useUserProfileController() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        getUserProfileUseCase
            .execute()
            .then((data) => {
                if (isMounted) setUser(data);
            })
            .catch((err: unknown) => {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch user profile.');
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        user,
        loading,
        error,
    };
}