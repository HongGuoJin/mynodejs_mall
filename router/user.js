//创建路由
let router = require("express").Router();
//导入服务端
let serviceUser = require("../service/user");
//添加
router.post("/", async (request, response) => {
    let body = request.body;

    let result = await serviceUser.addUser(body);
    response.success(result);

});
//删除
router.delete("/:username", async (request, response) => {
    let result = await serviceUser.deleteByUsername(request.params.username);
    response.success(result);
})
//查询
router.get("/:username", async (request, response) => {
    let result = await serviceUser.updateByUsername(request.params.username);
    response.success(result);
})
//登陆
router.post("/login", async (request, response) => {
    let result = await serviceUser.login(request.body);
    response.success(result);
})

//导出模板
module.exports = router;