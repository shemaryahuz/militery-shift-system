import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateShiftDto {
    // expected format: YYYY-MM-DD HH:mm:ss or YYYY-MM-DD HH:mm
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    startTime: Date;
    
    // expected format: YYYY-MM-DD HH:mm:ss or YYYY-MM-DD HH:mm
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    endTime: Date;

    @IsNotEmpty()
    @IsString()
    location: string;
}
