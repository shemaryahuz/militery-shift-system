import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User>{
    const user: User = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      hashedPassword: createUserDto.password,
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

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return undefined;
    }
    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;
    user.hashedPassword = updateUserDto.password ?? user.hashedPassword;
    return user;
  }

  async remove(email: string): Promise<any> {
    this.users = this.users.filter((user) => user.email !== email);
    return "user deleted";
  }
}
