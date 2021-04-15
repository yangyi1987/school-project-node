import {getRepository, Entity} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { UserServer } from '../server/user/userServer'
const jwt = require('jsonwebtoken');
const secret: string = "userToken"
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
        let user = await this.userRepository.findOne(id);
        if(user) {
            res.status(200);
            res.send({data: user, message: "用户查询成功"});
            res.end();
        }else {
            res.status(404);
            res.send("用户不存在");
            res.end();
        }
    }

    // 创建用户
    public async create(req: Request, res: Response, next: NextFunction) {
        // 创建实例
        let user = await this.userRepository.create(req.body);
        console.log(user);
        this.userRepository.save(user).then(result=>{
            res.status(201);
            res.send({data: result, message: "用户祖册成功"});
            res.end();
        }).catch(err=>{
            res.send("用户创建失败");
            res.end();
        })
    }

    // 删除某个用户
    public async delete(req: Request, res: Response, next: NextFunction) {
        const user: User = await this.userRepository.findOne(+req.params.id);
        this.userRepository.remove(user).then(result=>{
            console.log(result);
            res.status(204);
            res.send("成功删除用户");
            res.end();
        }).catch(err=>{
            res.status(401);
            res.send("删除失败")
            res.end();
        })
    }



    // user info update
    public async update(req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        let id = +req.params.id;
        let user = await this.userRepository.findOne(id);
        Object.keys(body).forEach(key=>{
            if(key !== 'id') {
                user[key] = body[key]
            }
        })
        this.userRepository.save(user).then(result=>{
            console.log("user 更新成");
            res.status(201);
            res.send(result);
            res.end();
        }).catch(err=>{
            console.log("user 更新失败");
            res.send("更新失败");
            res.end();
        })
        // return user;
    }

    public async login(req: Request, res: Response) {
        
    }

    // 创 token
    public loginServer(user: any,req: any, res: any): void {
        if(user[0]) {
            let token = this.createToken({code: user.code});
            res.status(200).send({code: 1, message: "登陆成功", record: user, token: token});
        } else {
            res.status(403).send({code: 0, message: "请检查账号和密码是否正确", record: null});
        }
    }

    // 生成 token
    public  createToken(info): string {
        return jwt.sign(info, "userToken", {expiresIn: 6*60*10});
    }
    // 验证 token
    public verifyToken(token) {
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
}
