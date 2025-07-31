import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { UsersModule } from 'src/users/users.module';
import { ShiftsModule } from 'src/shifts/shifts.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [UsersModule, ShiftsModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService, AuthGuard],
})
export class AssignmentsModule {}
