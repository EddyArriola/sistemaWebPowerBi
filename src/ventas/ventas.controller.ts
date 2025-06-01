import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { sales } from '@prisma/client';

@Controller('ventas')
export class VentasController {
    constructor(private readonly ventaService: VentasService){}

    @Get()
    async getTodo(){
        return this.ventaService.ObtenerTodoVentas()
    }

    @Post()
    async crearVenta(@Body() data: sales){
        return this.ventaService.CrearVenta(data)
    }

    @Get(':id')
    async getPorId(@Param('id') id: string){
        return this.ventaService.ObtenerUnaVenta(Number(id))
    }
    @Delete(':id')
    async borrar(@Param('id') id: string){
        return this.ventaService.EliminarVenta(Number(id))
    }
    @Put(':id')
    async Modificar(@Param('id') id: string, @Body() data: sales){
        return this.ventaService.ModificarVenta(Number(id), data)
    }

}
