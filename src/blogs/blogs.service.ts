import { ForbiddenException, Injectable } from '@nestjs/common';
import { createBlogsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BlogsService {
    constructor(private prisma:PrismaService){}
    async createBlogs(
        uuid:number,
        userId:number,
        dto:createBlogsDto
    ){
        try {
            const blog = await this.prisma.blog.create({
                data:{
                    userId:uuid,
                    ...dto,
                    upvote:0,
                }
            })
           return blog
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('User not found')
                }
            }
            throw error
        }
    }
}
