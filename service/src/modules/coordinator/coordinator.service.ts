import { Injectable } from '@nestjs/common';
import { IndicatorDto } from 'src/shared/dto/indicator-dto';
import { InventoryService } from '../inventory/inventory.service';
import { ReservationDataDto } from '../reservation/dto/reservation-data.dto';
import { ReservationService } from '../reservation/reservation.service';

@Injectable()
export class CoordinatorService {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly inventoryService: InventoryService,
  ) {}

  async makeReservation(resvData: ReservationDataDto): Promise<IndicatorDto> {
    const indicator: IndicatorDto = { success: false };
    const dateTimeObj = {
      date: resvData.date,
      timeslot: resvData.timeslot,
    };

    try {
      const remainingCapacity = await this.inventoryService.getRemainingCapacity(dateTimeObj);
      if (remainingCapacity > 0) {
        await this.reservationService.setItem(resvData);
        await this.inventoryService.incrementReservationsCount(dateTimeObj)
        indicator.success = true;
      }
    } catch (err) {
      indicator.success = false;
    }

    return indicator;
  }
}
