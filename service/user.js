//导入用户模板  用户模块已经连接数据库  有操作数据库的功能
let userModel = require("../model/user");
//导入加密的模板
let encryptUtils = require("../utils/encryptUtils");


/**
 * ********** 创建用户
 * @param user
 */
async function addUser(user) {
    let result1 = await userModel.findOne({username: user.username});
    if (result1) {
        throw Error("创建失败,用户名已存在")
    }
    user.role = 0;
    let encryprPassword = await encryptUtils.md5Hmac(user.username, user.password);
    user.password = encryprPassword;
    let result = await userModel.create(user);
    result.password = "";
    return result;
}

/**
 * **********删除用户 按照名字
 * @param username
 * @returns {Promise<*>}
 */
async function deleteByUsername(username) {
    let result = await userModel.deleteOne({username: username});
    console.log(result.n)
    if (result.n != "1") {
        throw Error("删除失败");
    }
    return result;

}

/**
 *
 * @param username
 * @returns {Promise<void>}
 */
async function updateByUsername(username) {
    let result = await userModel.findOne({username: username});
    result.password = "";
    console.log(result)
    return result;
}

/**登陆
 *
 * @param user
 * @returns {Promise<void>}
 */
async function login(user) {
    let usernameis = await userModel.findOne({username: user.username})
    if (!usernameis) {
        throw Error("用户名不存在")
    }

    let i = user.username;
    console.log(i)
    let e = user.password;
    console.log(e)
    let md5Hmac = encryptUtils.md5Hmac(i, e);
    console.log(md5Hmac)

    let passwordis = await userModel.findOne({password: md5Hmac})
    if (!passwordis) {
        throw Error("密码不存在")
    }

    let i2 = passwordis.username;
    console.log(i2)
    if (i == i2) {
        return "登陆成功了"
    }

    return "登陆失败";

}

module.exports = {
    addUser,
    deleteByUsername,
    updateByUsername,
    login
}