const express = require('express');
const { chatResponse, imageResponse, getImageUrl } = require('../controllers/response.controller.js');
const router = express.Router();

router.post('/chat', chatResponse)

router.post('/image', imageResponse);

router.get('/imageUrl/:id', getImageUrl);

module.exports = router;