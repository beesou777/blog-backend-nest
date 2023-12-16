import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Module({
  providers: [BlogsService]
})
export class BlogsModule {}
