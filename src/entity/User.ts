import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn() // 主键
    public id: number;

    @Column()
    public openid: string;

    @Column()
    public nickname: string;

    @Column()
    public avatarurl: string;

    @Column()
    public gender: number;

    @Column()
    public country: string;

    @Column()
    public province: string;

    @Column()
    public city: string;

    @Column()
    public language: string;

    @Column()
    public ctime: string;

    @Column()
    public mobile: string;

    @Column()
    public telnum: string;
}
