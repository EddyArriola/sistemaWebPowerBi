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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let userService = class userService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ObtenerTodo() {
        return this.prisma.user.findMany();
    }
    async ObtenerUno(id) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }
    async Crear(data) {
        const { email, password, role, createdAt } = data;
        return this.prisma.user.create({
            data: {
                email,
                password,
                role,
                createdAt,
            },
        });
    }
    async Modificar(id, data) {
        const { email, password, role, createdAt } = data;
        return this.prisma.user.update({
            where: { id },
            data: {
                email,
                password,
                role,
                createdAt
            },
        });
    }
    async Eliminar(id) {
        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }
};
exports.userService = userService;
exports.userService = userService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], userService);
//# sourceMappingURL=user.service.js.map