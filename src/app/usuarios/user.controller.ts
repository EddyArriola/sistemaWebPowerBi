import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { userService } from './user.service';
import { user } from '@prisma/client';

@Controller('user')
export class userController {
    constructor(private readonly userService: userService){}

    @Get()
    async getTodo(){
        return this.userService.ObtenerTodo()
    }

    @Post()
    async crearVenta(@Body() data: user){
        return this.userService.Crear(data)
    }

    @Get(':id')
    async getPorId(@Param('id') id: string){
        return this.userService.ObtenerUno(Number(id))
    }
    @Delete(':id')
    async borrar(@Param('id') id: string){
        return this.userService.Eliminar(Number(id))
    }
    @Put(':id')
    async Modificar(@Param('id') id: string, @Body() data: user){
        return this.userService.Modificar(Number(id), data)
    }

}
