import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

// controller for endpoints of '/auth' route
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    // endpoint for '/auth/login' route
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logIn(@Body(new ValidationPipe()) loginDto: LoginDto) {
        try {
            return await this.authService.logIn(loginDto);
        } catch (error) {
            throw new InternalServerErrorException(`error logging in: ${error.message}`);
        }
    }
    // endpoint for '/auth/register' route
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
        try {
            return await this.authService.signUp(signUpDto);
        } catch (error) {
            throw new InternalServerErrorException(`error registering: ${error.message}`);
        }
    }
}
