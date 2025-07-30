import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new InternalServerErrorException("error hashing password");
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user: User = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      hashedPassword: hashedPassword,
      role: "soldier"
    };
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<Array<User>> {
    return this.users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  };

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  };

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user: User | undefined = this.users.find((user) => user.email === email);
    if (!user) {
      return undefined;
    }
    if (updateUserDto.password) {
      const hashedPassword = await this.hashPassword(updateUserDto.password);
      user.hashedPassword = hashedPassword;
    }
    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;
    return user;
  }

  async remove(email: string): Promise<any> {
    this.users = this.users.filter((user) => user.email !== email);
    return "user deleted";
  }
}
