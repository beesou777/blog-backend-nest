import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post,Query,Req,UseGuards } from '@nestjs/common';
import { EditBlogsDto, UpdateBlogsDto, createBlogsDto } from './dto';
import { BlogsService } from './blogs.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { Blog, User } from '@prisma/client';


@UseGuards(JwtGuard)
@Controller('blogs')
export class BlogsController {
    constructor(private blogService:BlogsService){}

    @Post('create')
    createBlogs(
        @GetUser('') uuid:User,
        @Body() dto:createBlogsDto){
        return this.blogService.createBlogs(uuid.id,dto)
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getBlogs(
        @GetUser('id') uuid:number,
    ){
        return this.blogService.getBlogs(uuid)
    }

    
    @HttpCode(HttpStatus.OK)
    @Get(':slug')
    getBlogBySlug(@Param() slug: any) {
        try {
            return this.blogService.getBlogBySlug(slug.slug)
        } catch (error) {
            console.log(error);
        }
    }    

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getBlogsById(
        @GetUser('id') uuid:number,
        @Param('id',ParseIntPipe) blogId:number
    ){
        return this.blogService.getBlogsById(uuid,blogId)
    }

    @Patch(':id')
    updateBlogById(
        @GetUser('id') uuid:number,
        @Body() dto:EditBlogsDto,
        @Param('id',ParseIntPipe) blogId:number
         ){
        return this.blogService.updateBlogsById(dto,uuid,blogId)
    }

    @Delete(':id')
    deleteBlogsById(
        @GetUser('id') uuid:number,
        @Param('id',ParseIntPipe) blogId:number
    ){
       try {
        return this.blogService.deleteBlogsById(uuid,blogId)
       } catch (error) {
        throw new NotFoundException('Blog not found');
       }
    }

    // @Patch(':id')
    // updateUpvote(
    //     @GetUser('id') uuid:number,
    //     @Body() dto:UpdateBlogsDto,
    //     @Param('id',ParseIntPipe) blogId:number
    //      ){
    //     return this.blogService.updateUpvote(dto,uuid,blogId)
    // }
}
