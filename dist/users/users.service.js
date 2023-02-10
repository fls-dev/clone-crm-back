"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../models/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(user) {
        this.user = user;
    }
    findAll() {
        return this.user.find();
    }
    async create(body) {
        const candidate = await this.user.findOne({ where: { email: body.email } });
        if (!candidate) {
            const hashPassword = await bcrypt.hash(body.password, 9);
            let login = body.login;
            if (body.login === '') {
                login = new Date().getTime().toString();
            }
            const creating = await this.user.save(Object.assign(Object.assign({}, body), { password: hashPassword, login: login }));
            return { status: true, user: creating };
        }
        else {
            throw new common_1.HttpException('Пользователь с таким Email уже существует', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findOne(id) {
        return this.user.findOneBy({ id });
    }
    async remove(id) {
        await this.user.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map