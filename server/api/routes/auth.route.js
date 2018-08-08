const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const router = express.Router();

router.route('/login')
  .post(authCtrl.login);

router.route('/signup')
  .post(authCtrl.signup);
router.route('/most-liked')
  .get(userCtrl.mostLiked);
module.exports = router;
