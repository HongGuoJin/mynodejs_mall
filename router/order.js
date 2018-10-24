//导入服务端
let orderService = require("../service/order");
//导入路由模块
let router = require("express").Router();


//生成订单的请求
router.post("/", async (request, response) => {
    let result = await orderService.addItem(request.body);
    response.success(result);
});

//查询分页的信息
router.get("/", async (request, response) => {
    let result = await orderService.getByPage(request.query.page);
    response.success(result);
})


//导入
module.exports = router;