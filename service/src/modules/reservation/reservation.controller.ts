import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  DateDto,
  DateTimeslotDto,
  TimeslotDto,
} from '../../shared/dto/date-timeslot';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('lookup')
  lookup(@Query() params: DateTimeslotDto): Promise<Reservation[]> {
    return this.reservationService.findByTimeslotAndDate(params);
  }

  @Get('lookupByTime/:timeslot')
  lookupByTime(@Param() params: TimeslotDto): Promise<Reservation[]> {
    return this.reservationService.findByTimeslot(params.timeslot);
  }

  @Get('lookupByDate/:date')
  lookupByDate(@Param() params: DateDto): Promise<Reservation[]> {
    return this.reservationService.findByDate(params.date);
  }

  @Get()
  listAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }
}
