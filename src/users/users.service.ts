import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private user: Repository<User>,) {}

    findAll(): Promise<User[]> {
        return this.user.find();
    }

    async create(body) {
        const candidate = await this.user.findOne({where:{email:body.email}})
        if(!candidate){
            const hashPassword = await bcrypt.hash(body.password, 9);
            let login=body.login;
            if(body.login===''){
                login = new Date().getTime().toString()
            }
            const creating = await this.user.save({...body, password:hashPassword, login:login});
            return {status: true, user: creating}
        }else {
            throw new HttpException('Пользователь с таким Email уже существует', HttpStatus.BAD_REQUEST)
        }
    }

    findOne(id: number): Promise<User> {
        return this.user.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.user.delete(id);
    }
}