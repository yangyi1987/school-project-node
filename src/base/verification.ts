import { UserServer } from '../server/user/userServer'


// 用户登陆验证
let userServer = new UserServer();
export function verification(req, res, next) {
  if(req.path !== '/login' && req.method !== "OPTIONS") {
      let Authorization = req.get("Authorization");
      userServer.verifyToken(Authorization).then(()=>{
          console.log("验证成功");
          next();
      }).catch((err: Error)=>{
          res.type("json");
          res.status(401);
          res.rend({message: "token 过期,或没有token"});
          console.log("验证失败");
      })
  }
}
