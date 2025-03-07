import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { firstValueFrom } from 'rxjs';

interface User {
  _id: string;
  name: string;
  email: string;
  // Altre proprietà se necessarie
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    return firstValueFrom(
      this.userServiceClient.send({ cmd: 'register_user' }, registerUserDto),
    );
  }

  async login(loginUserDto: LoginUserDto) {
    // Tipizza la risposta usando l'interfaccia User
    const user = await firstValueFrom<User | null>(
      this.userServiceClient.send({ cmd: 'validate_user' }, loginUserDto),
    );

    if (user) {
      const payload = { username: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      };
    }

    return null;
  }
}
