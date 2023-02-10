import {Body, Controller, Headers, HttpCode, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}
    @HttpCode(200)
    @Post('/login')
    async login(@Body() body,@Res({ passthrough: true }) res){

        const login =await this.auth.login(body)

        res.cookie('refreshToken', login.refreshToken, {httpOnly: true, secure:false,  domain: '.localhost'});
        // res.cookie('refreshToken', login.refreshToken, {httpOnly: true, secure:false,  domain: '.localhost', path: '/auth/refresh'});

        return login
    }

    @HttpCode(200)
    @Post('/refresh')
    async refreshToken(@Headers() headers,
                       @Headers('user-agent') browser,
                       @Req() request,
                       @Res({ passthrough: true }) res){
        const refreshOld = request.cookies.refreshToken


    }
}
