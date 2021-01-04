import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { UserServer } from './server/user/userServer'
import  Routes  from './router/index'

createConnection().then(async connection => {

    let userServer = new UserServer();
    const app = express();
    app.use(bodyParser.json());

    // 用户 token 验证
    app.use((req: Request, res: Response, next: Function)=>{
        res.header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET POST OPTIONS DELETE PUT"
        })
        if(req.path !== '/login') {
            userServer.verifyToken(req.header.authorization).then(()=>{
                next()
            }).catch((err: Error)=>{
                res.type("json")
                res.status(401).send({code: 401, message: "token 过期,或没有token"})
            })
        }
    })

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });


    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");

}).catch(error => console.log(error));
