import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {sales} from '@prisma/client'

@Injectable()
export class VentasService {
    constructor(private prisma: PrismaService){}
        
   async ObtenerTodoVentas(): Promise<sales[]> {
       return this.prisma.sales.findMany();
    }

   async ObtenerUnaVenta(id: number): Promise<sales | null> {
       return this.prisma.sales.findUnique({
        where: {
            id
        }
       })
    }
   async CrearVenta(data: sales): Promise<sales> {
    const { product_name, quantity, unit_price, created_by } = data;
       return this.prisma.sales.create({
            data: {
                product_name,
                quantity,
                unit_price,
                created_by,
                },
       });
    }
   async ModificarVenta(id: number, data: sales): Promise<sales> {
    const { product_name, quantity, unit_price, created_by } = data;
       return this.prisma.sales.update({
            where: { id },
            data: {
                product_name,
                quantity,
                unit_price,
                created_by,
            },
       });
    }
   async EliminarVenta(id: number): Promise<sales> {
       return this.prisma.sales.delete({
        where: {
            id
        }
       });
    }
}
