import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './db/typeorm.config';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { CoordinatorModule } from './modules/coordinator/coordinator.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    InventoryModule,
    ReservationModule,
    CoordinatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
