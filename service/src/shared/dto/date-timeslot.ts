import { Validate } from 'class-validator';
import { DateOnly } from 'src/shared/date-only.validation';
import { TimeslotAllowed } from '../timeslot.validation';

export class DateTimeslotDto {
  @Validate(DateOnly)
  date: string;

  @Validate(TimeslotAllowed)
  timeslot: string;
}

export class DateDto {
  @Validate(DateOnly)
  date: string;
}

export class TimeslotDto {
  @Validate(TimeslotAllowed)
  timeslot: string;
}
