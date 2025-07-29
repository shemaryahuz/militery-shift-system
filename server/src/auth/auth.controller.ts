import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// controller for endpoints of '/auth' route
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    // endpoint for '/auth/login' route
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body: Record<string, any>) {
        return this.authService.logIn(body.username, body.password);
    }
    // endpoint for '/auth/register' route
    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() body: Record<string, any>) {
        return this.authService.signUp(body.username, body.password);
    }
}
