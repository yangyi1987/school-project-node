import { SrvRecord } from "dns";
import { User } from "../../entity/User";
const jwt = require('jsonwebtoken');
const  secret: string = "userToken"

export class UserServer {
  loginServer(user: any) {
    if(!user.id) return {code: 0, message: "登录失败,请检查账号和密码是否正确", record: null};
    let token = this.createToken(user);
    return {token : token, user: user}
  }

  createToken(info) {
    return jwt.sign(info, secret, {expiresIn: 6*60*10});
  }

  // 校验 token
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, result) => {
              if(error){
                  reject(error)
              } else {
                  resolve(result)
              }
      })
    })
  }
}
