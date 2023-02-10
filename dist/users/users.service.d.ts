import { User } from "../models/user.entity";
import { Repository } from 'typeorm';
export declare class UsersService {
    private user;
    constructor(user: Repository<User>);
    findAll(): Promise<User[]>;
    create(body: any): Promise<{
        status: boolean;
        user: any;
    }>;
    findOne(id: number): Promise<User>;
    remove(id: string): Promise<void>;
}
