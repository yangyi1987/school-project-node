const jwt = require('jsonwebtoken');
const  secret: string = "userToken"

export class UserServer {
  loginServer(user: any) {
    if(!user.id) return {code: 0, message: "登录失败,请检查账号和密码是否正确", record: null};
    let token = this.createToken({code: user.code});
    return {code: 1, message: "登陆成功", record: user, token: token}
  }

  createToken(info) {
    return jwt.sign(info, secret, {expiresIn: 6*60*10});
  }

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
