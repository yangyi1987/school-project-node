import {getRepository, Entity} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Application  } from "../entity/Application";
// 用户类

@Entity()
export class ApplicationController {

    private ApplicationRepository = getRepository(Application);

    // get application list
    public async index(req: Request, res: Response, next: NextFunction) {
        return this.ApplicationRepository.find();
    }

    // find a application
    public async find(req: Request, res: Response, next: NextFunction) {
      let id: number = +req.params.id;
      let app: Application = await this.ApplicationRepository.findOne(id);
      if(app) {
        res.send(app);
        res.end();
      } else {
        res.status(404);
        res.send({data: null, message: '应用不存在'});
        res.end();
      }
    }

  public async create(req: Request, res: Response, next: NextFunction) {
      this.ApplicationRepository
      return this.ApplicationRepository.create(req.body);
  }

  // delete application
  public async delete(req: Request, res: Response, next: NextFunction) {
    this.ApplicationRepository.delete(req.params.id);
    return "应用成功删除";
  }

  // update a application
  public async update(req: Request, res: Response, next: NextFunction) {
    let id: number = +req.params.id;
    let body = req.body;
    let app: Application | null | undefined = await this.ApplicationRepository.findOne(id);
    Object.keys(body).forEach(key=>{
      app[key] = body[key];
    })
    this.ApplicationRepository.save(app).then((record: Application)=>{
      res.status(201);
      res.send({data: record, message: '更新成功'});
      res.end();
    }).catch(err=>{
      console.log("application 更新失败");
      res.send("更新失败");
      res.end();
    })
  }

}
