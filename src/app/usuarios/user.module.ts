import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { userController,  } from './user.controller';
import { PrismaModule } from '../../prisma.module';

@Module({
  providers: [userService],
  controllers: [userController],
  imports: [PrismaModule]
})
export class UserModule {}
