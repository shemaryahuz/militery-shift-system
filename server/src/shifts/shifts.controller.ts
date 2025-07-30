import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  async create(@Body() createShiftDto: CreateShiftDto) {
    if (isNaN(createShiftDto.startTime.getTime())) {
      throw new BadRequestException("invalid start time format")
    }
    if (isNaN(createShiftDto.endTime.getTime())) {
      throw new BadRequestException("invalid end time format")
    }
    try {
      return await this.shiftsService.create(createShiftDto);
    } catch (error) {
      throw new InternalServerErrorException(`error creating shift: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.shiftsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`error finding shifts: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.shiftsService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(`error finding shift: ${error.message}`);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    try {
      return await this.shiftsService.update(+id, updateShiftDto);
    } catch (error) {
      throw new InternalServerErrorException(`error updating shift: ${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.shiftsService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(`error deliting shift: ${error.message}`);
    }
  }
}
