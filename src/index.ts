import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
// import { UserServer } from './server/user/userServer'
import  Routes  from './router/index'
import { nextTick } from "process";
import { verification } from './base/verification'


createConnection().then(async connection => {

    // let userServer = new UserServer();
    const app = express();
    // x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))
    // application/json
    app.use(bodyParser.json());

    // cors
    app.all("*",(req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
        res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
        next();
    })

    // 用户登陆验证
    // app.use(verification)


    // app.use((req, res, next) => {
    //     if(req.path !== '/login' && req.method !== "OPTIONS") {
    //         let Authorization = req.get("Authorization");
    //         userServer.verifyToken(Authorization).then(()=>{
    //             console.log("验证成功");
    //             next();
    //         }).catch((err: Error)=>{
    //             res.type("json");
    //             res.status(403);
    //             res.rend({message: "token 过期,或没有token"});
    //             console.log("验证失败");
    //         })
    //     }
    // });

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
