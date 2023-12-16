import { IsBoolean, IsNumber } from "class-validator";

export class UpdateBlogsDto{
    @IsBoolean()
    increment:boolean

    @IsBoolean()
    decrement:boolean

    @IsNumber()
    upvote:number;

}