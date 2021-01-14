const jwt = require('jsonwebtoken');
const secret: string = "userToken"

export class UserServer {
  public loginServer(user: any,req: any, res: any): void {
    if(user[0]) {
    let token = this.createToken({code: user.code});
      res.status(200).send({code: 1, message: "登陆成功", record: user, token: token});
    } else {
      res.status(403).send({code: 0, message: "请检查账号和密码是否正确", record: null});
    }
  }
  // 生成 token
  public  createToken(info): string {
    return jwt.sign(info, "userToken", {expiresIn: 6*60*10});
  }
  // 验证 token
  public verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, "userToken", (error, result) => {
              if(error){
                  reject(error)
              } else {
                  resolve(result)
              }
      })
    })
  }
}
