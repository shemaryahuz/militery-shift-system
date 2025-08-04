import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { UsersModule } from 'src/users/users.module';
import { ShiftsModule } from 'src/shifts/shifts.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, ShiftsModule, AuthModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
