import { Module } from '@nestjs/common';
import { CoordinatorController } from './coordinator.controller';
import { InventoryModule } from '../inventory/inventory.module';
import { ReservationModule } from '../reservation/reservation.module';
import { CoordinatorService } from './coordinator.service';

@Module({
  imports: [InventoryModule, ReservationModule],
  providers: [CoordinatorService],
  controllers: [CoordinatorController],
})
export class CoordinatorModule {}
