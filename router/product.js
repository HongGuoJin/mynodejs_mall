//导服务端
let productService = require("../service/product");
//到 router 路由 获取请求发送
let router = require("express").Router();

/**
 *   添加商品
 * @param product
 * @returns {Promise<void>}
 */
router.post("/", async (request, response) => {
    let result = await productService.addProduct(request.body);
    response.success(result);
})

/**
 *              查询
 * @param id
 * @returns {Promise<*>}
 */
router.get("/", async (request, response) => {
    let result = await productService.findOver(request.query.page);
    response.success(result);
})

/**      删除
 *
 * @param id
 * @returns {Promise<*>}
 */
router.delete("/:id", async (request, response) => {
    let result = await productService.deleteByID(request.params.id);
    response.success(result);
})

/**      更新
 *
 * @param id
 * @returns {Promise<*>}
 */
router.put("/:id", async (request, response) => {
    let result = await productService.undateByID(request.params.id, request.body);
    response.success(result);
})


//导出
module.exports = router;