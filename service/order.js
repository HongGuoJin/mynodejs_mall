//导入模板
let orderModel = require("../model/order");
//精确计算的模板
let Big = require("big.js");
//导入商品的模板 要减库存
let productService = require("../model/product");
let config = require("../config");


/**
 *                     -- 生产订单
 * @returns {Promise<void>}
 */
async function addItem(order) {
    //根据传的json对象获取里面的id值,查询id是否存在
    let product = await productService.findOne({_id: order.productId});
    if (!product) {
        throw Error(`商品为${order.productId}没有找到`);
    }
    //获取库存
    let productStock = product.stock;
    //获取价格
    let productPrice = product.price;
    //获取商品名
    let productName = product.name;
    //判断库存是否足够卖出去
    let orderCount = order.count;
    if (productStock < orderCount) {
        throw Error("数量不够,请减少数量购买,或者不买");
    }
    //计算总金额
    let orderPrice = Big(orderCount).times(productPrice);
    console.log(`总金额${orderPrice}`);

    //从新给订单赋值,生成一张表单
    //名字
    order.productName = productName;
    //价格
    order.productPrice = productPrice;
    //订单总金额
    order.total = Big(orderCount).times(productPrice);
    //提交订单
    let orderResult = await orderModel.create(order);

    //orderCount * productPrice;
    //扣减库存
    let lastProductStock = productStock - orderCount;
    //修改库存后保存到商品模板表里面区
    let productResult = await productService.updateOne({_id: order.productId}, {stock: lastProductStock});
    //  console.log(productResult);
    //付款时间
    //  console.log(order.payTime);

    return orderResult;

};

//分页查询
async function getByPage(page) {
    if (page == 0 || page == null) {
        page = 1;
    }
    ;
    let skipSize = (page - 1) * config.PAGE_SIZE

    let result = await orderModel.find().skip(skipSize).limit(config.PAGE_SIZE);
    return result;
}

//导出
module.exports = {
    addItem,
    getByPage
};

