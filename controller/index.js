"use strict";

const fs = require("fs");
const path = require("path");

exports.showIndex = function (req, res, next) {
    //拿到刚才中间件挂载的一个根目录名称
    let rootDir = req.app.locals.rootDir;
    fs.readdir(rootDir,function (err, files) {
        if(err){
            return next(err);
        }
        let albumNames = [];
        files.forEach(function (item) {
            if(fs.statSync(path.join(rootDir,item)).isDirectory()){
                albumNames.push(item);
            }
        });
        res.render('index',{
            albumNames:albumNames
        });
    });
};