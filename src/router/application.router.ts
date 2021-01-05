import { IRouter } from "./index";
import { ApplicationController } from '../controller/ApplicationController';


const Routes: Array<IRouter> = [
  {
    method: 'get',
    action: "index",
    route: '/applications',
    controller: ApplicationController,
  },
  {
    method: 'delete',
    action: "delete",
    route: '/applications/:id',
    controller: ApplicationController,
  },
  {
    method: 'post',
    action: "create",
    route: '/applications',
    controller: ApplicationController,
  },
  {
    method: 'patch',
    action: "update",
    route: '/applications',
    controller: ApplicationController,
  }
]
