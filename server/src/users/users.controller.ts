import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(`error creating user: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`error finding users: ${error.message}`);
    }
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    try {
      return await this.usersService.findOne(email);
    } catch (error) {
      throw new InternalServerErrorException(`error finding user: ${error.message}`);
    }
  }

  @Patch(':email')
  async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(email, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException(`error updating user: ${error.message}`);
    }
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    try {
      return await this.usersService.remove(email);
    } catch (error) {
      throw new InternalServerErrorException(`error deliting user: ${error.message}`);
    }
  }
}
