"use strict";

const express = require('express');
const indexController = require('./controller/index');
const albumController = require('./controller/album');
//router就可以用来组织用户路由
const router = express.Router();

router.get('/',indexController.showIndex);
router.get('/:albumName',albumController.showAlbum);
router.post('/album/:albumName',albumController.uploadPic);


module.exports = router;

