const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "用户名必须要填写11"],
        unique: true
    },

    created: {
        type: Date,
        default: Date.now()
    }
});

//导出商品分类模板
module.exports = mongoose.model("category", schema);