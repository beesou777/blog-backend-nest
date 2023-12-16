import { ForbiddenException, Injectable } from '@nestjs/common';
import { createBlogsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BlogsService {
    constructor(private prisma:PrismaService){}
    async createBlogs(
        uuid:number,
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

    async getBlogs(uuid:number){
        try {
            const blogs = await this.prisma.blog.findMany({
                where:{
                    userId:uuid
                }
            })
            return blogs
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('excess to resource denied')
                }
            }
            throw error
        }
    }

    async getBlogsById(uuid:number,blogid:number){
        try {
            const blog = this.prisma.blog.findFirst({
                where:{
                    id:blogid,
                    userId:uuid
                }
            })
            console.log(uuid,blogid)
            return blog
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denies")
                }
            }
        }
    }

    async updateBlogsById(){
        try {
            
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denies")
                }
            }
        }
    }

    async deleteBlogsById(){
        try {
            
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denies")
                }
            }
        }
    }
}
