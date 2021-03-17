import { Body, Controller, Post } from '@nestjs/common';
import { IndicatorDto } from 'src/shared/dto/indicator-dto';
import { ReservationDataDto } from '../reservation/dto/reservation-data.dto';
import { CoordinatorService } from './coordinator.service';

@Controller('coordinator')
export class CoordinatorController {
  constructor(private readonly coordinatorService: CoordinatorService) {}

  @Post('makeReservation')
  makeReservation(@Body() resvData: ReservationDataDto): Promise<IndicatorDto> {
    return this.coordinatorService.makeReservation(resvData);
  }
}
