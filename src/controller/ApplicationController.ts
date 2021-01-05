import {getRepository, Entity} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Application  } from "../entity/Application";
// 用户类

@Entity()
export class ApplicationController {

    private ApplicationRepository = getRepository(Application);

    // 查询所有的引用
    public async index(req: Request, res: Response, next: NextFunction) {
        return this.ApplicationRepository.find();
    }

    //添加应用
    public async create(req: Request, res: Response, next: NextFunction) {
      this.ApplicationRepository
      return this.ApplicationRepository.create(req.body);
  }

  // 删除一个应用
  public async delete(req: Request, res: Response, next: NextFunction) {
    return this.ApplicationRepository.delete(req.params.id);
  }

  //修改引用信息
  public async update(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id;
    delete req.body.id;
    return this.ApplicationRepository.update(id, req.body)
  }

}
