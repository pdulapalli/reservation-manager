import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { ReservationDataDto } from './dto/reservation-data.dto';
import { DateTimeslotDto } from 'src/shared/dto/date-timeslot';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  findOne(id: string): Promise<Reservation> {
    return this.reservationRepository.findOne(id);
  }

  countByTimeslotForDate({ date, timeslot }: DateTimeslotDto): Promise<number> {
    return this.reservationRepository.count({
      where: {
        timeslot,
        date,
      },
    });
  }

  findByTimeslotAndDate({
    date,
    timeslot,
  }: DateTimeslotDto): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: {
        timeslot,
        date,
      },
    });
  }

  findByTimeslot(timeslot: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: {
        timeslot,
      },
    });
  }

  findByDate(date: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: {
        date,
      },
    });
  }

  setItem(reservationDataDto: ReservationDataDto): Promise<Reservation> {
    const res = new Reservation();
    res.name = reservationDataDto.name;
    res.email = reservationDataDto.email;
    res.partySize = reservationDataDto.partySize;
    res.date = reservationDataDto.date;
    res.timeslot = reservationDataDto.timeslot;
    return this.reservationRepository.save(res);
  }

  removeAll(): Promise<void> {
    return this.reservationRepository.clear();
  }
}
