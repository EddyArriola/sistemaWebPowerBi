import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma.module'; 
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    AuthModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [
    AppController,
  
  ],
  providers: [
  
  ],
})
export class AppModule {}
