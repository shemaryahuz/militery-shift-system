import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    try {
      return await this.assignmentsService.create(createAssignmentDto);
    } catch (error) {
      throw new InternalServerErrorException(`error creating assignment: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.assignmentsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`error finding assignments: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.assignmentsService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(`error finding assignment: ${error.message}`);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    try {
      return await this.assignmentsService.update(+id, updateAssignmentDto);
    } catch (error) {
      throw new InternalServerErrorException(`error updating assignment: ${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.assignmentsService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(`error deliting assignment: ${error.message}`);
    }
  }
}
