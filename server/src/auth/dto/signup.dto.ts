import { IsString, IsEmail, MinLength } from "class-validator";

export class SignUpDto {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}