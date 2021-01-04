import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn() // 主键
    public id: number;

    @Column()
    public code: string;

    @Column()
    public  password: string;

    @Column()
    public userName: string;

    @Column()
    public position: string;

    @Column()
    public roles: string

}
