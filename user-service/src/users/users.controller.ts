import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'register_user' })
  async register(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'validate_user' })
  async login(@Payload() loginUserDto: LoginUserDto) {
    return this.usersService.validateUser(loginUserDto);
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() id: string) {
    return this.usersService.findById(id);
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(
    @Payload() data: { id: string; updateData: Partial<CreateUserDto> },
  ) {
    return this.usersService.update(data.id, data.updateData);
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
