import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    async hashPassword(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error) {
            const msg = "error hashing password";
            console.log(msg);
            throw new InternalServerErrorException({ message: msg });
        }
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            const msg = "error comparing password";
            console.log(msg);
            throw new InternalServerErrorException({ message: msg });
        }
    }
    async validateUsername(username: string) {
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser) {
            const msg = "username already exists";
            console.log(msg);
            throw new UnauthorizedException({ message: msg });
        }
    }
    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            const msg = "invalid username";
            console.log(msg);
            throw new UnauthorizedException({ message: msg });
        } else {
            const isValidPassword = await this.comparePassword(password, user.hashedPassword);
            if (!isValidPassword) {
                const msg = "invalid password";
                console.log(msg);
                throw new UnauthorizedException({ message: msg });
            }
            return user;
        }
    }

    createToken(user: User) {
        const payload = { userId: user.userId, username: user.username, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async logIn(username: string, password: string) {
        const user = await this.validateUser(username, password);
        return this.createToken(user);
    }

    async signUp(username: string, password: string) {
        await this.validateUsername(username);
        const hashedPassword = await this.hashPassword(password);
        const newUser: User = await this.usersService.create({ username, hashedPassword });
        return this.createToken(newUser);
    }
}
