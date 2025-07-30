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

  async findOne(id: number): Promise<Shift | undefined> {
    return this.shifts.find((shift) => shift.id === id);
  }

  async update(id: number, updateShiftDto: UpdateShiftDto): Promise<Shift | undefined> {
    const shift: Shift | undefined = this.shifts.find((shift) => shift.id === id);
    if (!shift){
      return undefined;
    }
    shift.startTime = updateShiftDto.startTime ?? shift.startTime;
    shift.endTime = updateShiftDto.endTime ?? shift.endTime;
    shift.location = updateShiftDto.location ?? shift.location;
    return shift;
  }

  async remove(id: number): Promise<any> {
    this.shifts = this.shifts.filter((shift) => shift.id !== id);
    return "shift deleted";
  }
}
