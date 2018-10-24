//导入商品模板
let productModel = require("../model/product");
//导入配置
let config = require("../config");

/**
 *   添加商品
 * @param product
 * @returns {Promise<void>}
 */
async function addProduct(product) {
    let chaxun = await productModel.findOne({name: product.name});
    if (chaxun) {
        throw Error("存在了")
    }
    let result = await productModel.create(product);
    return result;
}

/**
 * ---------跟新
 * @param id
 * @param product
 * @returns {Promise<*>}
 */
async function undateByID(id, product) {
    let result = await productModel.findOne({_id: id});
    if (!result) {
        throw Error("id不存在")
    }
    result = await productModel.findOne({name: product.name});
    if (result) {
        throw Error("名字存在了")
    }


    let result2 = await productModel.updateOne({_id: id}, product);
    return result2;

}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
async function findByID(id) {

    let result = await productModel.findOne({_id: id});
    if (!result) {
        throw Error("id不存在")
    }
    return promise;
}

/**
 *   删除
 * @param id
 * @returns {Promise<*>}
 */
async function deleteByID(id) {
    let result1 = await productModel.findOne({_id: id});
    if (!result1) {
        throw Error("id不存在")
    }
    let result = await productModel.deleteOne({_id: id});
    return result;

}

/**
 *------------------查询
 * @param id
 * @returns {Promise<*>}
 */
async function findOver(page) {
    console.log(page)
    if (page <= 0) {
        page = 1
    }
    ;
    let tiao = (page - 1) * config.PAGE_SIZE;

    let totalpage = await productModel.find().count();
    console.log(totalpage);
    if (tiao >= totalpage) {
        throw Error("没有跟多的数据了")
    }

    let result = await productModel.find().skip(tiao).limit(config.PAGE_SIZE + 1);
    console.log(result + "==")
    return result;
}

//导出
module.exports = {
    addProduct,
    undateByID,
    deleteByID,
    findOver
};