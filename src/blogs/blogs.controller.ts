import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { createBlogsDto } from './dto';
import { BlogsService } from './blogs.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';


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
    @Get('')
    getBlogs(
        @GetUser('id') uuid:number,
    ){
        return this.blogService.getBlogs(uuid)
    }
}
