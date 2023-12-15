import { ForbiddenException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EditDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUser(user:User){
        return user
    }
    async editUserData(userId:number, dto: EditDto) {
        try {

            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if(!user || user.id !== userId ){
                throw new ForbiddenException('excess to resource denied')
            }
            return this.prisma.user.update({
                where:{
                    id:userId,
                },
                data:{
                    ...dto
                }
            })
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("cannot perform")
                }
            }
            throw error

        }
    }
}
