import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as process from "process";
import {User} from "./models/user.entity";
import {JwtModule} from "@nestjs/jwt";
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
  }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        User
      ],
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
