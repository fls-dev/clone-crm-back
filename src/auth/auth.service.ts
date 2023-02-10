import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private user: Repository<User>,private JWT: JwtService) {}

    async login (body){
        const findUser = await this.user.findOne({
            where: [
                {login: body.login},
                {email: body.login}
            ]
        });

        if(findUser){
            const passwordCompare = await bcrypt.compare(body.password, findUser.password )
            if(passwordCompare){
                const payload = {id:findUser.id}
                const payloadRefresh = {id:findUser.id, now: Date.now()}

                const accessToken = this.JWT.sign(payload,{expiresIn:'1h'});
                const refreshToken = this.JWT.sign(payloadRefresh,{expiresIn:'60d', secret: process.env.REFRESH_KEY_JWT})

                let expiresIn = new Date();
                expiresIn.setMonth(expiresIn.getMonth() + 1);

                return{
                    status: true,
                    message: "Authorization successfully completed!",
                    user: findUser,
                    accessToken,
                    refreshToken
                }
            }else throw new UnauthorizedException({status: false, message:'no correct password'})
        }else {
            throw new UnauthorizedException({status: false, message:'no correct user'})
        }
    }

}
