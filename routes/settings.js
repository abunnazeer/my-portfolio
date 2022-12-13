const express = require('express');
const router = express.Router();
const settingsController = require('./../controllers/settingController');

router
  .route('/config')
  .get(settingsController.config)
  .post(settingsController.createConfig);

module.exports = router;
