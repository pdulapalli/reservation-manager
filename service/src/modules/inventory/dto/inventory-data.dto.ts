import { IsInt, Min, Validate } from 'class-validator';
import { DateOnly } from 'src/shared/date-only.validation';
import { LessOrEqlThanRelated } from 'src/shared/lesser-than-related.validation';
import { TimeslotAllowed } from 'src/shared/timeslot.validation';

export class InventoryDataDto {
  @Validate(TimeslotAllowed)
  timeslot: string;

  @Validate(DateOnly)
  date: string;

  @IsInt()
  @Min(0)
  capacity: number;

  @IsInt()
  @Min(0)
  @LessOrEqlThanRelated('capacity')
  reservations: number;
}
export class InventoryDataNoResDto {
  @Validate(TimeslotAllowed)
  timeslot: string;

  @Validate(DateOnly)
  date: string;

  @IsInt()
  @Min(0)
  capacity: number;
}