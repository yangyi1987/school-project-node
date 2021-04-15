import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public account: string;

  @Column()
  public password: string;

  @Column()
  public nickname: string;
}
