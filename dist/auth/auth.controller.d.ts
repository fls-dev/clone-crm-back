import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    login(body: any, res: any): Promise<{
        status: boolean;
        message: string;
        user: import("../models/user.entity").User;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(headers: any, browser: any, request: any, res: any): Promise<void>;
}
