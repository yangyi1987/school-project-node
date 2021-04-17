import {getRepository, Entity} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {  Documentation } from "../entity/Documentation";
// 用户类

@Entity()
export class DocumentationController {
  private DocumentationRepository = getRepository(Documentation);


  public async index(req: Request, res: Response, next: NextFunction) {
    let list: Array<Documentation> | undefined | null;
    let body = req.body;
    let keys = Object.keys(body);
    if(keys.includes('state')) {
      list = await this.DocumentationRepository.find({state: body.state});
    }else {
      list = await this.DocumentationRepository.find();
    }
    res.send({data: list, message: "成功"});
    res.end();
  }

  public async find(req: Request, res: Response, next: NextFunction) {
    let id = +req.params.id;
    let documentation = await this.DocumentationRepository.findOne(id);
    res.send(documentation);
    res.end();
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    this.DocumentationRepository.delete(+req.params.id);
    return '删除成功';
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let id = +req.params.id;
    let documentation = await this.DocumentationRepository.findOne(id);
    Object.keys(body).forEach(key=>{
      documentation[key] = body[key];
    })
    this.DocumentationRepository.save(documentation).then(result=>{4
      res.status(201);
      res.send({data: result, message: '更新成功'});
      res.end();
    }).catch(err=>{
      console.log("更新失败");
      res.send("更新失败");
      res.end();
    })
  }
}
