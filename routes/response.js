const express = require('express');
const { chatResponse, imageResponse } = require('../controllers/response.controller.js');
const router = express.Router();

router.post('/chat', chatResponse)

router.post('/image', imageResponse);

module.exports = router;