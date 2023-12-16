import { IsNotEmpty, IsString } from "class-validator";

export class createBlogsDto{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsString()
    @IsNotEmpty()
    blogImages:string;

    upvote:number = 0;
}