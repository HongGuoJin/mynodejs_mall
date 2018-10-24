//导入配置
let config = require("../config");
//导入加密jiemi
let encryptUtils = require("../utils/encryptUtils");
//导入model  User服务端
let UserModel = require("../model/user");


function address(url) {

    //校验不需要登陆就可以访问的izhi
    let ignoreUrls = [
        /\/user\/regist/,
        /\/user\/login/
    ];
    //默认是没有校验失败
    let ignore = false;
    for (let i = 0; i < ignoreUrls.length; i++) {
        if (ignoreUrls[i].test(url)) {
            //校验到了
            return ignore = true;
            break;
        }
    }
    return ignore;
};


//导出中间件
module.exports = async (request, respone, next) => {
    let url = request.url;
    let findOne = "";
    let ignore = address(url);
    if (ignore) {
        console.log(`${url}地址是不需要登陆也可以访问的`)
    } else {
        let getToken = request.get("token");
        if (!getToken) {
            throw Error("token不存在,请从新登陆")
        }
        ;
        let tokenDecrypt = null;
        try { //把请求头传来的token进行解密 得到一个token字符串
            tokenDecrypt = encryptUtils.aesDecrypt(getToken, config.TOKEN_KEY);
        } catch (e) {
            throw Error("token解密异常")
        }
        //把tonken字符串解析成token对象
        tokenDecrypt = JSON.parse(tokenDecrypt);
        //判断这个token对象里面的name存在不存
        findOne = await UserModel.findOne({username: tokenDecrypt.username});
        if (!findOne) {
            throw Error("token校验失败,名字不存在")
        }
        ;
        let expire = tokenDecrypt.expire;
        if (Date.now() > expire) {
            throw Error("token有效期已经过了")
        }
    }
    //把查询到的用户存储到request对象身上
    request.user = findOne;

    //放行
    next();
}