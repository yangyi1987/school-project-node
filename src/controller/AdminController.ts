import {getRepository, Entity} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Admin  } from "../entity/Admin";
const jwt = require('jsonwebtoken');
const secret: string = "userToken"


  // 生成 token
export  function  createToken(info): string {
    return jwt.sign({data: info}, "userToken", {expiresIn: 6*60*10});
  }
// 验证 token

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
      jwt.verify(token, "userToken", (error, result) => {
          if(error){
              reject(error)
          } else {
              resolve(result)
          }
      })
  })
}

@Entity()
export class AdminController {

  private AdminRepository = getRepository(Admin);

  // get admin list
  public async index(req: Request, res: Response, next: NextFunction) {
    let adminList:Array<Admin> = await this.AdminRepository.find();
    return {data: adminList, message: '查询成功'};
  }

  // as id find admin
  public async find(req: Request, res: Response, next: NextFunction) {
    let id: number = +req.params.id;
    let admin: Admin | null | undefined = await this.AdminRepository.findOne(+id);
    if(admin) {
      res.send({data: admin, message: '查询成功'});
      res.end();
    }else {
      res.status(404);
      res.send({data: null, message: "资源不存在"});
      res.end();
    }
  }

  public async crate(req: Request, res: Response, next: NextFunction) {
  }

  // update admin
  public async update(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let id: number = +req.params.id;
    let admin: Admin | undefined | null  = await this.AdminRepository.findOne(id);
    Object.keys(body).forEach(key=>{
      admin[key] = body[key];
    })
    this.AdminRepository.save(admin).then(record=>{
      res.status(201);
      res.send({data: record, message: '资源更新成功'});
      res.end();
    }).catch(err=>{
      res.send("资源更新失败");
      res.end();
    })
  }

  // delete admin
  public async delete(req: Request, res: Response, next: NextFunction) {
    this.AdminRepository.delete(+req.params.id);
    res.status(204);
    return '资源删除成功'
  }


  // admin login
  public async login(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let admin: Admin | null | undefined = await this.AdminRepository.findOne({account: body.account, password: body.password});
    console.log(admin);
    if(admin) {
      let token: string = createToken(admin);
      console.log(token);
      res.send({data: admin,token, message: '登录成功'});
      res.end();
    }else {
      res.status(401);
      res.send('登录失败');
      res.end();
    }
    return admin;
  };



}
