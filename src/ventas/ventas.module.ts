import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  providers: [VentasService],
  controllers: [VentasController],
  imports: [PrismaModule]
})
export class VentasModule {}
