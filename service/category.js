//导入连接了数据库的模板
let categoryModel = require("../model/category");
//导出自定义的配置
let config = require("../config");

/**
 * -----------------添加分类
 * @param category
 * @returns {Promise<void>}
 */
async function addItem(category) {
    let fingOne = await categoryModel.findOne(category);
    if (fingOne) {
        throw Error("此商品分类已经存在")
    }
    let result = await categoryModel.create(category);
    return result;
};

/**
 * ------------删除分类
 * @param name
 * @returns {Promise<*>}
 */
async function deleteByname(name) {
    let fingOne = await categoryModel.findOne(name);
    if (!fingOne) {
        throw Error("此商品分类不存在")
    }
    let result = await categoryModel.deleteOne(name);
    return result;
}

/**
 * ------------修改分类
 * @param id
 * @returns {Promise<void>}
 */
async function updateByID(id, name) {
    let result = await categoryModel.updateOne({_id: id}, name);
    console.log(result.n)
    if (result.n != "1") {
        throw Error("修改失败了")
    }
    return result;
}

/**
 * ---------------------------分页
 * @returns {Promise<void>}
 */
async function findByPage(page) {
    if (page == 0) {
        page = 1;
    }
    ;
    //设置一个偏移量
    let fooset = (page - 1) * config.PAGE_SIZE;
    console.log(fooset)
    let totalNumber = await categoryModel.find().count();

    if (fooset >= totalNumber) {
        throw Error("已经没有更多的数据了")
    }

    let result = await categoryModel.find().skip(fooset).limit(config.PAGE_SIZE);

    return result;
}

//导出
module.exports = {
    addItem,
    deleteByname,
    updateByID,
    findByPage
};