import {UserController} from "../controller/UserController";
import { IRouter } from "./index";

const Routes: Array<IRouter> = [{
    method: "get",
    route: "/users/1223",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id/123",
    controller: UserController,
    action: "one"
}];
module.exports = Routes;
