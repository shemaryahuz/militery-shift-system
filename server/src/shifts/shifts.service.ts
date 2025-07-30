import { Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftsService {
  private shifts: Shift[] = [];
  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const shift: Shift = {
      id: this.shifts.length + 1,
      startTime: createShiftDto.startTime,
      endTime: createShiftDto.endTime,
      location: createShiftDto.location
    }
    this.shifts.push(shift);
    return shift;
  }

  async findAll(): Promise<Array<Shift>> {
    return this.shifts;
  }

  findOne(id: number) {
    return `This action returns a #${id} shift`;
  }

  update(id: number, updateShiftDto: UpdateShiftDto) {
    return `This action updates a #${id} shift`;
  }

  remove(id: number) {
    return `This action removes a #${id} shift`;
  }
}
