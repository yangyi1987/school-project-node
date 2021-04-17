import {DocumentationController} from "../controller/DocumentationController";
import { IRouter } from "./index";

const Routes: Array<IRouter> = [{
    method: "get",
    route: "/documentations",
    controller: DocumentationController,
    action: "index"
}, {
    method: "get",
    route: "/documentations/:id",
    controller: DocumentationController,
    action: "find"
},
{
    method: "post",
    route: "/documentations",
    controller: DocumentationController,
    action: "create"
},
{
  method: "patch",
  route: "/documentations/:id",
  controller: DocumentationController,
  action: "update"
},
{
  method: "delete",
  route: "/documentations/:id",
  controller: DocumentationController,
  action: "delete"
}
];
module.exports = Routes;
