import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule,
     PrismaModule
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
