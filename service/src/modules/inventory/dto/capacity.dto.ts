import { IsInt, Min } from 'class-validator';

export class CapacityDto {
  @IsInt()
  @Min(0)
  capacity: number;
}
