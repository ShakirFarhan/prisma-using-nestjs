import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { formData } from './constants';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(formdata: formData) {
    const hash = await argon.hash(formdata.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: formdata.email,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      console.log(error.message);
    }
  }
  async signin(formdata: formData) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: formdata.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect Credentials');
    }
    const passMatches = await argon.verify(user.hash, formdata.password);
    if (!passMatches) {
      throw new ForbiddenException('Incorrect Credentials');
    }
    return this.signToken(user.id, user.email);
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
