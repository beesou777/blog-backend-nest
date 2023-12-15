import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private config:ConfigService,
        private jwt : JwtService
    ) { }

    async signup(dto: AuthDto): Promise<User> {
        try {
            const hash = await argon.hash(dto.password)
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    first_name: dto.first_name,
                    last_name: dto.last_name,
                    password: hash
                }
            })
            delete user.password
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    async signin(dto: AuthDto):Promise<any> {

        try {
            // find user
            const user = this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })
            if (!user) {
                throw new ForbiddenException('Crenditial incorrect')
            }

            const matchPassword = await argon.verify(
                (await user).password,
                dto.password
            )

            if (!matchPassword) {
                throw new ForbiddenException('Crenditials incorrect')
            }

            // generate token
            return this.accessToken((await user).id,(await user).email)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code = 'P2002') {
                    throw new ForbiddenException('Credentials unmatched')
                }
            }
            throw error
        }
    }

    // generate toekn
    async accessToken(
        userId: number,
        email: string
        ): Promise<{access_token:string}> {
        // playload
        const playload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')

        // generate token
        const token = await this.jwt.signAsync(playload,{
            expiresIn : '1d',
            secret:secret
        })

        
        return {
            access_token : token
        }
    }

}
