import { User } from "../models/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private user;
    private JWT;
    constructor(user: Repository<User>, JWT: JwtService);
    login(body: any): Promise<{
        status: boolean;
        message: string;
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
}
