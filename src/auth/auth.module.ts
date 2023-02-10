import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../models/user.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'super',
      signOptions: {expiresIn:'7h'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
