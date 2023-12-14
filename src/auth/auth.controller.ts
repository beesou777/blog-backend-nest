import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    // sign up
    @Post('signup')
    signup(@Body() dto:AuthDto) {
        return this.authService.signup(dto)
    }

    // sign in
    @Post('signin')
    signin(){

    }

}
