//导入服务端的模板
let categoryService = require("../service/category");
//导入router路由来接收和发送请求
let router = require("express").Router();

/**
 * -----------------添加分类
 * @param category
 * @returns {Promise<void>}
 */
router.post("/", async (request, response) => {
    let result = await categoryService.addItem(request.body);
    response.success(result);
});

/**
 * ------------删除分类
 * @param name
 * @returns {Promise<*>}
 */
router.delete("/", async (request, response) => {
    let result = await categoryService.deleteByname(request.body);
    response.success(result);
})

/**
 * ------------修改分类
 * @param id
 * @returns {Promise<void>}
 */
router.put("/:id", async (request, response) => {

    let result = await categoryService.updateByID(request.params.id, request.body);
    response.success(result);
})

/**
 * ---------------------------分页
 * @returns {Promise<void>}
 */
router.get("/:id", async (request, response) => {
    let result = await categoryService.findByPage(request.params.id);
    response.success(result);
})


//导出
module.exports = router;