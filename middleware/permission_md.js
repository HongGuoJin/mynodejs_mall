//定管理员和用户的权限
let authority = [

    {//用户的权限
        role: 0,
        urls: [
            /\/user\/regist/,
            /\/user\/login/,
            /\/order.*/
        ]
    },
    {//管理员的权限
        role: 100,
        urls: [
            /.*/
        ]

    }

];

//导出这个方法
module.exports = (request, response, next) => {
    //定义boolen变量
    let isgo = false;
    //获取请求的地址
    let url = request.url;
    //获取发起请求的用户
    //  console.log("====")
    let user = request.user;
    //   console.log(request)
    //console.log(user)
    if (user) {
        outto:for (let i = 0; i < authority.length; i++) {
            let authorityI = authority[i];
            // console.log(authorityI)
            if (authorityI.role == user.role) {
                for (let j = 0; j < authorityI.urls.length; j++) {
                    if (authorityI.urls[j].test(url)) {
                        isgo = true;
                        break outto;
                    }
                }
            }
        }

        if (!isgo) {
            throw Error("没有权限访问")
        }
    }
    ;


    next();
}
