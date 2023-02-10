import {Body, Controller, Get, Headers, HttpCode, Post} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UsersService} from "./users.service";
import {User} from "../models/user.entity";


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly user: UsersService) {}

    @HttpCode(200)
    @Get('/findAll')
    async findAll(){

    }
    @ApiOperation({ summary: 'Create user, type=user' })
    @ApiResponse({ status: 200, description: 'Registration has been successfully completed!'})
    @HttpCode(200)
    @Post('/create')

    async create(@Body() body){
        return await this.user.create(body)
    }


}
