import {getRepository, Entity} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { UserServer } from '../server/user/userServer'
// 用户类

@Entity()
export class UserController {

    private userServer = new UserServer();
    private userRepository = getRepository(User);

    // 查询 user list
    public async index(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    // 查询 id 为 req.params.id 的用户
    public async find(req: Request, res: Response, next: NextFunction) {
        let id = +req.params.id;
        const user = await this.userRepository.findOne(id);
        return  user;
    }

    // 添加单个用户
    public async create(req: Request, res: Response, next: NextFunction) {
        // 创建实例
        let user = await this.userRepository.create(req.body);
        // 添加和更新
        this.userRepository.save(user).then(result=>{
            // record = result;
            console.log("实例添加成");
            res.send(result);
            res.end();
        }).catch(err=>{
            console.log("已经存在该实例, 实例添加失败! ");
            res.
            res.end("已经存在该实例, 实例添加失败!")
        })
    }

    // 删除某个用户
    public async delete(req: Request, res: Response, next: NextFunction) {
        this.userRepository.delete(req.params.id).then(result=>{
            console.log(result);
            res.send("删除成功");
            res.end();
        }).catch(err=>{
            res.end("资源删除失败");
        })
    }


    public async update(req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        let id = +req.params.id;
        let user = await this.userRepository.update(id, body);
        return user;
    }

    public async login(req: Request, res: Response) {
        // const user: any = await this.userRepository.find({code: req.body.code, password: req.body.password});
        // this.userServer.loginServer(user, req, res);
    }
}
