//查询当前的环境配置
let nodeenv = process.env.NODE_ENV;

let config = null;


if (nodeenv === "production") {
    config = require("./production")
} else {
    config = require("./development")
}
;

module.exports = config;