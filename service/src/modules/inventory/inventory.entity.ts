import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index(["timeslot", "date"], { unique: true })
export class Inventory {
  @PrimaryColumn()
  date: string;

  @PrimaryColumn()
  timeslot: string;

  @Column()
  capacity: number;

  @Column()
  reservations: number;
}
