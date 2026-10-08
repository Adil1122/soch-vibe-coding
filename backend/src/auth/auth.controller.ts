import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username?: string; password?: string }) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(AdminAuthGuard)
  @Get('me')
  getProfile(@Req() req: any) {
    return {
      authenticated: true,
      user: req.user,
    };
  }
}
