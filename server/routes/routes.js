
const express = require('express');
const router = express.Router();

const controller                = require('../controller/controller');
const validator                 = require('../utility/validator');

router.get('/comments',     controller.getComments);
router.post('/comments',    validator.postComments,     controller.postComments);

module.exports = router;