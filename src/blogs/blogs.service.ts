import { ForbiddenException, HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EditBlogsDto, createBlogsDto } from './dto';
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

   /**
    * The function `getBlogsById` retrieves a blog by its ID and the user's UUID, and throws a
    * ForbiddenException if there is an access denial error.
    * @param {number} uuid - The `uuid` parameter is a number that represents the user's unique
    * identifier. It is used to filter the blogs based on the user who created them.
    * @param {number} blogId - The `blogid` parameter is the unique identifier of a specific blog. It
    * is used to query the database and retrieve the blog with the matching ID.
    * @returns the blog object that matches the given UUID and blog ID.
    */
    async getBlogsById(uuid:number,blogId:number){
        try {
            const blog = this.prisma.blog.findFirst({
                where:{
                    id:blogId,
                    userId:uuid
                }
            })
            return blog
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denied")
                }
            }
        }
    }

    async updateBlogsById(
        dto:EditBlogsDto,
        uuid:number,
        blogId:number
    ){
        try {
            const blog = await this.prisma.blog.findUnique({
                where:{
                    id:blogId,
                }
            })
        
            if (!blog) {
                throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
              }
          
              if (blog.userId !== uuid) {
                throw new HttpException('You are not the owner', HttpStatus.FORBIDDEN);
              }          

            return this.prisma.blog.update({
                where:{
                    id:blogId
                },
                data:{
                    ...dto
                }
            })
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denies")
                }
            }
        }
    }

    async deleteBlogsById(
        uuid:number,
        blogId:number
    ){
        try {
            const blog = await this.prisma.blog.delete({
                where:{
                    id:blogId,
                    userId:uuid
                }
            })

            if(!blog){
                throw new NotFoundException("blog not found")
            }
            return {
                message:"success fully deleted"
            }
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denies")
                }
            }
        }
    }
}
