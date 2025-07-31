import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [ShiftsController],
  providers: [ShiftsService, AuthGuard],
  exports: [ShiftsService],
})
export class ShiftsModule {}
