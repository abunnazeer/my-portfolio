const express = require('express');
const router = express.Router();
const settingsController = require('./../controllers/settingController');

router.route('/').get(settingsController.config);

module.exports = router;
