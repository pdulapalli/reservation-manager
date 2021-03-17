import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { InventoryDataNoResDto } from './dto/inventory-data.dto';
import { DateTimeslotDto } from 'src/shared/dto/date-timeslot';
import { CapacityDto } from './dto/capacity.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async lookup(dateTimeObj: DateTimeslotDto): Promise<Inventory> {
    return this.inventoryRepository.findOne({
      date: dateTimeObj.date,
      timeslot: dateTimeObj.timeslot,
    });
  }

  async retrieveAllottedCapacity(dateTimeObj: DateTimeslotDto): Promise<number> {
    const invRecord = await this.inventoryRepository.findOne({
      where: {
        timeslot: dateTimeObj.timeslot,
        date: dateTimeObj.date,
      }
    });

    if (typeof invRecord === 'undefined' ||
      invRecord === null) {
      return 0;
    }

    return invRecord.capacity;
  }

  async getRemainingCapacity(dateTimeObj: DateTimeslotDto): Promise<number> {
    const invRecord = await this.inventoryRepository.findOne({
      where: {
        timeslot: dateTimeObj.timeslot,
        date: dateTimeObj.date,
      }
    });

    if (typeof invRecord === 'undefined' ||
      invRecord === null) {
      return 0;
    }

    const remaining = invRecord.capacity - invRecord.reservations;
    return remaining > 0 ? remaining : 0;
  }

  listForDate(date: string): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: {
        date,
      }
    });
  }

  async listAvailableTimeslots(date: string): Promise<string[]> {
    const results = await this.inventoryRepository.find({
      date,
      capacity: Raw(alias =>`${alias} > reservations`)
    });

    return results.map(r => r.timeslot);
  }

  async listDisallowedTimeslots(date: string): Promise<string[]> {
    const results = await this.listAvailableTimeslots(date);
    const possibilities = this.generateCombinations();

    return possibilities.filter((p) => {
      return !results.includes(p);
    });
  }

  async incrementReservationsCount(dateTimeObj: DateTimeslotDto): Promise<void> {
    await this.inventoryRepository.increment(
      {
        date: dateTimeObj.date,
        timeslot: dateTimeObj.timeslot,
      },
      'reservations',
      1
    );
  }

  async setItem(inventoryDataDto: InventoryDataNoResDto): Promise<Inventory> {
    const inv = new Inventory();
    inv.timeslot = inventoryDataDto.timeslot;
    inv.date = inventoryDataDto.date;
    inv.capacity = inventoryDataDto.capacity;

    const existing = await this.inventoryRepository.findOne({
      date: inventoryDataDto.date,
      timeslot: inventoryDataDto.timeslot,
    });

    if (!existing) {
      inv.reservations = 0;
    }

    return this.inventoryRepository.save(inv);
  }

  async setCapacity(dateTimeObj: DateTimeslotDto,
    capacityObj: CapacityDto): Promise<Inventory> {
    await this.inventoryRepository.update(
      {
        date: dateTimeObj.date,
        timeslot: dateTimeObj.timeslot,
      },
      {
        capacity: capacityObj.capacity,
      }
    );

    return this.inventoryRepository.findOne({
      date: dateTimeObj.date,
      timeslot: dateTimeObj.timeslot,
    });
  }

  private generateCombinations(): string[] {
    const possibleHours = Array(24).fill(0).map((_v, i) => i.toString());
    const possibleMinutes = ['00', '15', '30', '45'];

    const possibilities = [];

    for (let i = 0; i < possibleHours.length; i += 1) {
      for (let j = 0; j < possibleMinutes.length; j += 1) {
        let hourStr = possibleHours[i];
        hourStr = hourStr.length === 1 ? '0' + hourStr : hourStr;
        const minuteStr = possibleMinutes[j];
        possibilities.push(`${hourStr}${minuteStr}`);
      }
    }

    return possibilities;
  }
}
