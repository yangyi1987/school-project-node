import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public appName: string;

  @Column()
  public appRouter: string;

  @Column()
  public appIcon: string;

  @Column()
  public appRoles: string;

}
