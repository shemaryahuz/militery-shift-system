import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string,
        pass: string
    ): Promise<{access_token: string}> {

        const user: User | undefined = await this.usersService.findOne(username);

        if (!user) {
            throw new UnauthorizedException({ error: "username not found" });
        }

        const { password } = user; // TODO: using bcrypt and compare to hashed pass

        if (password !== pass) {
            throw new UnauthorizedException({ error: "wrong password" });
        }

        const payload = { userId: user.userId, username: user.username };
        
        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token
        }

    }
    
}
