import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

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
            throw new InternalServerErrorException("error hashing password");
        }
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw new InternalServerErrorException("error comparing password");
        }
    }
    async validateUsername(username: string) {
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser) {
            throw new UnauthorizedException("username already exists");
        }
    }
    async validateUser(loginDto: LoginDto): Promise<User> {
        const user = await this.usersService.findByUsername(loginDto.username);
        if (!user) {
            throw new UnauthorizedException("invalid username or password");
        } else {
            const isValidPassword = await this.comparePassword(loginDto.password, user.hashedPassword);
            if (!isValidPassword) {
                throw new UnauthorizedException("invalid username or password");
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

    async logIn(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto);
        return this.createToken(user);
    }

    async signUp(signUpDto: SignUpDto) {
        await this.validateUsername(signUpDto.username);
        const hashedPassword = await this.hashPassword(signUpDto.password);
        const newUser: User = await this.usersService.create({ 
            username: signUpDto.username, 
            hashedPassword 
        });
        return this.createToken(newUser);
    }
}
