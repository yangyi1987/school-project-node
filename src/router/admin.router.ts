import {AdminController} from "../controller/AdminController";
import { IRouter } from "./index";

const Routes: Array<IRouter> = [{
    method: "get",
    route: "/admins",
    controller: AdminController,
    action: "index"
}, {
    method: "get",
    route: "/admins/:id",
    controller: AdminController,
    action: "find"
},
{
    method: "post",
    route: "/admins",
    controller: AdminController,
    action: "create"
},
{
  method: "patch",
  route: "/admins/:id",
  controller: AdminController,
  action: "update"
},
{
  method: "delete",
  route: "/admins/:id",
  controller: AdminController,
  action: "delete"
},
{
  method: "post",
  route: "/admins/login",
  controller: AdminController,
  action: "login"
}
];
module.exports = Routes;
