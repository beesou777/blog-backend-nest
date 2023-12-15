import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class EditDto {
    @IsNotEmpty()
    first_name : string

    @IsNotEmpty()
    last_name : string
}