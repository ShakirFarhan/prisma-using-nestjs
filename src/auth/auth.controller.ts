import {
  Body,
  Controller,
  Post,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service.';
import { formData } from './constants/index';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} //This is called dependency injection- We create the instance directly of the aut service class
  @Post('signup')
  signup(@Body() data: formData) {
    return this.authService.signup(data);
  }
  @HttpCode(HttpStatus.OK) //200 POST request by default returns 201 code
  @Post('signin')
  signin(@Body() data: formData) {
    return this.authService.signin(data);
  }
}
