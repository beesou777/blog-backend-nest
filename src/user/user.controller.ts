import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { AuthDto, EditDto } from 'src/auth/dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getUser(@GetUser() user: User) {
        return this.userService.getUser(user)
    }

    @Patch('/edit')
    editUserData(
        @GetUser() user:User,
        @Body() dto: EditDto
    ) {
       return this.userService.editUserData(user.id,dto);
    }
}
