import { Injectable } from '@nestjs/common';

export type User = {
    userId: number,
    username: string,
    password: string
}

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            role: 'commander',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            role: 'soldier',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
