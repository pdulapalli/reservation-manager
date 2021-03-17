import { IsEmail, IsInt, IsNotEmpty, Min, Validate } from 'class-validator';
import { DateOnly } from 'src/shared/date-only.validation';
import { TimeslotAllowed } from 'src/shared/timeslot.validation';

export class ReservationDataDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(1)
  partySize: number;

  @Validate(DateOnly)
  date: string;

  @Validate(TimeslotAllowed)
  timeslot: string;
}
