import { ForbiddenException, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor (
        private prisma:PrismaService,
        // private config:ConfigService
    ){}   

    // sign up
    async signup(dto:AuthDto):Promise<User>{
        try {
            const hash = await argon.hash(dto.password)
            const user = await this.prisma.user.create({
                data:{
                    email:dto.email,
                    first_name:dto.first_name,
                    last_name:dto.last_name,
                    password:hash
                }
            })
            delete user.password
            return user 
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    // sign in
    async signin(){

    }

}
