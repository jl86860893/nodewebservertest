"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const path = require("path");
const config = require("./config");

//调用express得到一个APP实例
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//设置静态资源处理中间件
app.use('/www',express.static('www'));
app.use(express.static('root'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    app.locals.rootDir = config.rootDir;
    next();
});

//不要把用户的具体业务逻辑写到这个页面，当前入口模块，一般用于配制设置
//挂在路由中间件
app.use(router);

//配置错误请求体中间件
if(config.debug){
    app.use(function (err, req, res, next) {
        res.send(`糟了，出错了：${err.message}`);
    });
}



app.listen(3000,'127.0.0.1',function () {
    console.log('server is running at port 3000');
});