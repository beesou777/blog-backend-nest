import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    first_name : string

    @IsString()
    @IsNotEmpty()
    last_name : string
}