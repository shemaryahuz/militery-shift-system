import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ShiftsModule } from './shifts/shifts.module';

@Module({
  imports: [AuthModule, UsersModule, AssignmentsModule, ShiftsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
