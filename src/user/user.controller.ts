import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
@UseGuards(JwtGuard) // global level-- this acts like a middleware. In this JWT guard it verify the token like we did in express
@Controller('users')
export class UserController {
  @Get('me')
  getUser(@GetUser() user: User) {
    //Here @GetUser() is a custom request , @GetUser('email') email: string will return the email

    return user;
  }
}
