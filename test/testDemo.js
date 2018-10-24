let require1 = require("../service/category");
require("../db");

async function f() {

    require1.addItem(
        {
            name: "aa"


        }
    )
}

f()