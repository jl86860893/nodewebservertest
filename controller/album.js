"use strict";

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

exports.showAlbum = function (req,res,next) {
    let albumName = req.params.albumName;

    let rootDir = req.app.locals.rootDir;

    let fullPath = path.join(rootDir,albumName);

    fs.readdir(fullPath,function (err, files) {
        if(err){
            return next(err);
        }
        let srcs = [];
        files.forEach(function (item) {
            if (fs.statSync(path.join(fullPath, item)).isFile()) {
                srcs.push(`/${albumName}/${item}`);
            }
        });
        res.render('album',{
            srcs:srcs,
            title:albumName,
            uploadUrl: `/album/${albumName}`
        });
    });
};

exports.uploadPic = function (req, res, next) {
    let albumName = req.params.albumName;
    let rootDir = req.app.locals.rootDir;
    let fullPath = path.join(rootDir,albumName);

    // res.send(fullPath);

    let form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (err) {
            return next(err);
        }
        let pic = files.pic;
        let tempPath = pic.path;
        let extName = path.extname(pic.name);

        let distPath = path.join(fullPath,+new Date()+'')+extName;

        fs.rename(tempPath,distPath,function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('back');
        });
    });

};
