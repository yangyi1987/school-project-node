import {UserController} from "../controller/UserController";
import { IRouter } from "./index";

const Routes: Array<IRouter> = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "index"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "find"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "create"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "delete"
},
{
    method: "patch",
    route: "/users/:id",
    controller: UserController,
    action: "update"
},
{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}

];
module.exports = Routes;
