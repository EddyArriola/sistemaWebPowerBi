import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { user } from '@prisma/client'

@Injectable()
export class userService {
    constructor(private prisma: PrismaService){}
        
   async ObtenerTodo(): Promise<user[]> {
       return this.prisma.user.findMany();
    }

   async ObtenerUno(id: number): Promise<user | null> {
       return this.prisma.user.findUnique({
        where: {
            id
        }
       })
    }
   async Crear(data: user): Promise<user> {
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
   async Modificar(id: number, data: user): Promise<user> {
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
   async Eliminar(id: number): Promise<user> {
       return this.prisma.user.delete({
        where: {
            id
        }
       });
    }
}
