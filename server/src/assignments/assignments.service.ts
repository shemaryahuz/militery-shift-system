import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { UsersService } from 'src/users/users.service';
import { ShiftsService } from 'src/shifts/shifts.service';

@Injectable()
export class AssignmentsService {

  constructor(
    private usersService: UsersService,
    private shiftsService: ShiftsService
  ) {}

  private assignments: Assignment[] = [];

  async isUserExists(userId: number): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      return false;
    }
    return true;
  }

  async isShiftExists(shiftId: number): Promise<boolean> {
    const shift = await this.shiftsService.findOne(shiftId);
    if (!shift) {
      return false;
    }
    return true;
  }

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const { userId, shiftId } = createAssignmentDto;
    if (!(await this.isUserExists(userId))) {
      throw new Error("user does not exist");
    }
    if (!(await this.isShiftExists(shiftId))) {
      throw new Error("shift does not exist");  
    }
    const assignment: Assignment = {
      id: this.assignments.length + 1,
      userId: userId,
      shiftId: shiftId
    };
    this.assignments.push(assignment);
    return assignment;
  }

  async findAll(): Promise<Assignment[]> {
    return this.assignments;
  }

  async findOne(id: number): Promise<Assignment | undefined> {
    return this.assignments.find((assignment) => assignment.id === id);
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<Assignment | undefined> {
    const assignment: Assignment | undefined = this.assignments.find((assignment) => assignment.id === id);
    if (!assignment) {
      return undefined;
    }
    const { userId, shiftId } = updateAssignmentDto;
    if (!userId && !shiftId) {
      return assignment;
    }
    if (!(await this.isUserExists(userId ?? assignment.userId))) {
      throw new Error("user does not exist");
    }
    if (!(await this.isShiftExists(shiftId ?? assignment.shiftId))) {
      throw new Error("shift does not exist");  
    }
    assignment.userId = userId ?? assignment.userId;
    assignment.shiftId = shiftId ?? assignment.shiftId;
    return assignment;
  }

  async remove(id: number): Promise<any> {
    this.assignments = this.assignments.filter((assignment) => assignment.id !== id);
    return "assignment deleted";
  }
}
