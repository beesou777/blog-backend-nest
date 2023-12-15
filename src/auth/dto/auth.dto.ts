import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    first_name : string

    last_name : string
}