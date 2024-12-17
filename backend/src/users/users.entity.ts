import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  pw: string;

  @Column()
  name: string;

  @Column()
  birth_date: Date;
}
