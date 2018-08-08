const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
  .get(userCtrl.list)
  .post(userCtrl.create);
router.route('/most-liked')
  .get(userCtrl.mostLiked);

router.route('/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.route('/:userId/like')
  .put(userCtrl.like);

router.route('/:userId/unlike')
  .put(userCtrl.unlike);

router.param('userId', userCtrl.getUserByID);

module.exports = router;
