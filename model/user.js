let mongoose = require("mongoose");


//用户模板页面导入数据库 ,可以和数据库连接,拥有操作数据库的方法
let schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名不能不写"],
        unique: [true, "用户名不能重复"]
    },
    password: {
        type: String,
        required: [true, ["密码必须要写"]]
    },
    age: {
        type: Number,
        min: [0, "不能小于0岁"],
        max: [150, "不能大于150岁"]
    },
    role: {
        type: Number,
        default: 0
    },
    create: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("user", schema);