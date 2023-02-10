import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly user;
    constructor(user: UsersService);
    findAll(): Promise<void>;
    create(body: any): Promise<{
        status: boolean;
        user: any;
    }>;
}
