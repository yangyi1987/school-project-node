import {getRepository, Entity} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { UserServer } from '../server/user/userServer'
// 用户类

@Entity()
export class UserController {

    private userServer = new UserServer();
    private userRepository = getRepository(User);

    public async index(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    public async find(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.findOne(res.params.id);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.create(req.body);

    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.remove(req.params.id);
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.save(req.body);
    }

    public async login(req: Request, res: Response) {
        const user: any = await this.userRepository.find({code: req.body.code, password: req.body.password});
        return this.userServer.loginServer(user[0])
    }

}
