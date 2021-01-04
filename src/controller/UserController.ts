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
        const user: any = this.userRepository.find({code: req.body.code , password: req.body.password});
        return this.userServer.loginServer(user)
    }



    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}
