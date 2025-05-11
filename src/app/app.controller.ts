import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  redirectToLogin(@Res() res: Response) {
    return res.redirect('/login.html');
  }

  
  @Get('/login')
  getLoginPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
  }

  @Get('/register')
  getRegisterPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'register.html'));
  }

  @Get('/admin')
  getAdminDashboard(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'admin.html'));
  }

  @Get('/menu')
  getUserMenu(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'menu.html'));
  }
}
