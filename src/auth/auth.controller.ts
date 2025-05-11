import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Res() res: Response, @Body() body: any) {
    const { email, password, role } = body;
    try {
      
      await this.authService.register(email, password, role);
      
      return res.redirect('/login.html');
    } catch (error) {
      const err = error as Error;
      return res.status(400).send('Error al registrar: ' + err.message);
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body() body: any) {
    try {
      const { email, password } = body;
      const result = await this.authService.login(email, password);

    
      const payload: any = this.jwtService.decode(result.access_token);

      if (payload?.role === 'ADMIN') {
        return res.redirect('/admin.html');
      } else if (payload?.role === 'USER') {
        return res.redirect('/menu.html');
      } else {
        return res.status(403).send('Rol no permitido');
      }
    } catch (error) {
      const err = error as Error;
      return res.status(401).send('Credenciales inválidas: ' + err.message);
    }
  }
}
