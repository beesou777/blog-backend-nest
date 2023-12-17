import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { EditBlogsDto, UpdateBlogsDto, createBlogsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BlogsService {
    constructor(
        private prisma:PrismaService,
        ){}

    async createBlogs(
        uuid:number,
        dto:createBlogsDto
    ){
        try {
            const slugify = dto.slug.replace(/\s+/g,'-').toLocaleLowerCase() + (Math.random() * Math.pow(36,6) | 0).toString(36)

            const blog = await this.prisma.blog.create({
                data:{
                    userId:uuid,
                    slug:slugify,
                    title:dto.title,
                    body:dto.body,
                    content:dto.content,
                    tagList:dto.tagList,
                    upvote:0,
                    upvoted:false
                }
            })
           return blog
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    console.log(error)
                    throw new ForbiddenException('excess denied')
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

    async getBlogBySlug(slug?: string) {
        try {
            const blog = await this.prisma.blog.findMany({
                where:{
                    slug:slug
                }
            });
    
    
            if (!blog || blog.length === 0) {
                throw new NotFoundException('Blog not found');
            }
    
            return blog;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Access denied');
                }
    
                if (error.code === 'P2025') {
                    throw new NotFoundException('Blog not found');
                }
            }
            throw error;
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

            console.log(dto)
            const data = await this.prisma.blog.update({
                where:{
                    id:blogId
                },
                data:{
                    ...dto
                }
            })
            return data
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denies")
                }
            }
            throw error
        }
    }

    async deleteBlogsById(
        uuid:number,
        blogId:number
    ):Promise<any>{
        try {
            const blog = await this.prisma.blog.delete({
                where:{
                    id:blogId,
                    userId:uuid
                }
            })
            if(!blog){
               console.log("hello")
            }
            try {
                return {
                    message:"success fully deleted"
                }
            } catch (error) {
                throw new NotFoundException('Blog not found');
            }

        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("excess denies")
                }

                if(error.code === 'P2025'){
                    throw new NotFoundException('blog not found')
                }
            }
            throw error
        }
    }

    

    // async updateUpvote(
    //     dto:UpdateBlogsDto,
    //     uuid:number,
    //     blogId:number
    //     ){
    //         try {
    //             const blog = await this.prisma.blog.findUnique({
    //                 where:{
    //                     id:blogId,
    //                 }
    //             })
            
    //             if (!blog) {
    //                 throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    //               }
              
    //               if (blog.userId !== uuid) {
    //                 throw new HttpException('You are not the owner', HttpStatus.FORBIDDEN);
    //               }          

    //               if(dto.increment == true){
    //                 return 
    //               }
    //         } catch (error) {
    //             if(error instanceof PrismaClientKnownRequestError){
    //                 if(error.code === 'P2002'){
    //                     throw new ForbiddenException("excess denies")
    //                 }
    //             }
    //         }
    // }
}