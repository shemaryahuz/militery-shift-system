import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}