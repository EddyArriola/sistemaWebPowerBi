import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import {user_role} from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Registrar usuario
  async register(email: string, password: string, role: string) {
    // validar si existe
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('El usuario ya existe');
    }

    // Convertir el role a un valor del enum Role
    const userRole: user_role = role.toUpperCase() === 'ADMIN' ? user_role.ADMIN : user_role.USER;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: userRole,  
      },
    });

    return newUser;
  }


  async login(email: string, password: string) {
    
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña proporcionada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    
    const payload = { email: user.email, sub: user.id, role: user.role }; 
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}

