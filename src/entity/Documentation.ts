
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
// 文档
/**
 * id 文档id
 * fileName 文档名称
 * category 文档分类
 * academy 文档所属学院
 * userId 上传者Id
 * file 文档
 * description 文档描述
 * time 上传时间
 *
*/

@Entity()
export class Documentation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userId: number;

  @Column()
  public category: string;

  @Column()
  public academy: string;

  @Column()
  public description: string;

  @Column()
  public time: Date;

  @Column()
  public filePath: string;

  //audit success failure
  @Column({
    default: 'audit',
    length: 25
  })
  public state: string;

  @Column()
  public fileName: string;
}

