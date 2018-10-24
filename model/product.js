//和数据库连接
const mongoose = require("mongoose");

//创建数据表    商品的详情信息
const schema = new mongoose.Schema({
    //商品名字
    name: {
        type: String,
        required: [true, "商品名不能是空"],
        unique: true
    },
    //价格
    price: {
        type: String,
        required: [true, "价格不能为空"]
    },
    //库存
    stock: {
        type: Number,
        default: 0
    },
    //类别
    category: {
        type: mongoose.Schema.Types.ObjectId,//id
        required: [true, "商品的分类id不能为空"]
    },
    //描述
    description: {
        type: String
    },
    //是否上架
    isOnSale: {
        type: Boolean,
        default: false
    },
    //时间
    created: {
        type: Date,
        default: Date.now()
    }
});

//导出模板   给数据库的表起个名字
module.exports = mongoose.model("product", schema);