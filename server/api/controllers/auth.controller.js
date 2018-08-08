const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .select('_id password email userName')
    .exec()
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(500).json({ message: 'Email or password does not match' });
      }

      return user.authenticate(req.body.password)
      .then(() => {
        const token = jwt.sign({
          _id: user._id, // eslint-disable-line
          userName: user.userName,
          email: user.email,
        }, config.jwtSecret, { expiresIn: config.jwtExpires });

        res.json({
          _id: user._id, // eslint-disable-line
          userName: user.userName,
          email: user.email,
          token,
        });
      })
      .catch(() => {
        res.status(500).json({ message: 'Email or password does not match' });
      });
    })
    .catch(next);
}

function signup(req, res, next) {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  user.save()
  .then((newUser) => {
    res.json(newUser);
  })
  .catch(next);
}

module.exports = {
  login,
  signup,
};
