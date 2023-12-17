import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class createBlogsDto{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    slug:string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsString()
    @IsNotEmpty()
    body:string;

    @IsArray()
    @IsNotEmpty()
    tagList:string[];

    upvote:number = 0;

    upvoted:boolean = false
}