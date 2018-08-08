const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.use(userCtrl.getProfile);

router.route('/me')
  .get(userCtrl.read);

router.route('/me/update-password')
  .post(userCtrl.update);

module.exports = router;
