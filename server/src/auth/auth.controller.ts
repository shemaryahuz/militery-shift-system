import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
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
    logIn(@Body(new ValidationPipe()) loginDto: LoginDto) {
        return this.authService.logIn(loginDto);
    }
    // endpoint for '/auth/register' route
    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
