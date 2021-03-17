import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Inventory } from './inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryDataNoResDto } from './dto/inventory-data.dto';
import { DateDto, DateTimeslotDto } from 'src/shared/dto/date-timeslot';
import { CapacityDto } from './dto/capacity.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('lookup/:date/:timeslot')
  lookup(@Param() params: DateTimeslotDto): Promise<Inventory> {
    return this.inventoryService.lookup(params);
  }

  @Get('allottedCapacity/:date/:timeslot')
  retrieveAllottedCapacity(@Param() params: DateTimeslotDto): Promise<number> {
    return this.inventoryService.retrieveAllottedCapacity(params);
  }

  @Get('remainingCapacity/:date/:timeslot')
  getRemainingCapacity(@Param() params: DateTimeslotDto): Promise<number> {
    return this.inventoryService.getRemainingCapacity(params);
  }

  @Get('list/:date')
  listForDate(@Param() params: DateDto): Promise<Inventory[]> {
    return this.inventoryService.listForDate(params.date);
  }

  @Get('availability/:date')
  listAvailableTimeslots(@Param() params: DateDto): Promise<string[]> {
    return this.inventoryService.listAvailableTimeslots(params.date);
  }

  @Get('disallowed/:date')
  listDisallowedTimeslots(@Param() params: DateDto): Promise<string[]> {
    return this.inventoryService.listDisallowedTimeslots(params.date);
  }

  @Post('setCapacity/:date/:timeslot')
  setCapacity(@Param() params: DateTimeslotDto,
    @Body() body: CapacityDto): Promise<Inventory> {
    return this.inventoryService.setCapacity(params, body);
  }

  @Post()
  upsert(@Body() inventoryData: InventoryDataNoResDto): Promise<Inventory> {
    return this.inventoryService.setItem(inventoryData);
  }
}
