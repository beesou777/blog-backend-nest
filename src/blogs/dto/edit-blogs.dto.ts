import { IsOptional, IsString } from "class-validator";

export class EditBlogsDto{
    @IsString()
    @IsOptional()
    title:string;

    @IsString()
    @IsOptional()
    content:string;

    @IsString()
    @IsOptional()
    blogImages:string;
}