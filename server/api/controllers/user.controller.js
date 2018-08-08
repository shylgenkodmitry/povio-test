const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

function create(req, res, next) {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    likers: [],
    liking: [],
  });

  user.save()
  .then((newUser) => {
    res.json(newUser);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.userModel, {
    userName: req.body.userName,
    email: req.body.email,
  });

  if (req.body.password) {
    req.userModel.password = req.body.password;
  }

  req.userModel.save()
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.userModel);
}

function list(req, res, next) {
  User.find()
  .then((users) => {
    res.json(users);
  })
  .catch(next);
}

function mostLiked(req, res, next) {
  User.find()
  .then((users) => {
    users.sort((a, b) => {
      if (a.likers.length > b.likers.length) return -1;
      if (a.likers.length < b.likers.length) return 1;
      return 0;
    });
    res.json(users);
  })
  .catch(next);
}

function like(req, res, next) {
  const likerId = req.params.userId;

  User.findById(likerId)
  .then((likeUser) => {
    if (!likeUser) {
      res.status(404).json({message: 'User not found'});
      return;
    }
    if (likeUser.likers.findIndex((likerItor) => {
      return likerItor.toString() === req.user._id
    }) > -1) {
      res.status(404).json({message: 'You already liked this user'});
      return;
    }
    likeUser.likers.push(req.user._id);
    return likeUser.save();
  })
  .then((likeUser) => {
    const promises = [];
    promises.push(
      User.findById(req.user._id)
      .then((user) => {
        if (user.liking.findIndex((likingItor) => {
          return likingItor.toString() === likerId
        }) > -1) {
          res.status(404).json({message: 'This user is already liking you'});
        }
        user.liking.push(likerId);
        return user.save();
      })
    );
    return Promise.all(promises)
    .then(() => {
      res.json({status: 'success', like: true , likedUserId: likerId, likingUserId: req.user._id })
    })
  })
  .catch(next);
}

function unlike(req, res, next) {
  const unLikerId = req.params.userId;

  User.findById(unLikerId)
  .then((unLikeUser) => {
    if (!unLikeUser) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    let unLikeUserIndex = unLikeUser.likers.indexOf(new ObjectId(req.user._id));

    if(unLikeUserIndex === -1) {
      res.status(404).send({message: 'Unable to Unlike'});
      return;
    }

    unLikeUser.likers.splice(unLikeUserIndex, 1);
    return unLikeUser.save();
  })
  .then((unLikeUser) => {
    const promises = [];
    promises.push(
      User.findById(req.user._id)
      .then((user) => {
        let userLikingIndex = user.liking.indexOf(unLikerId);
        if (userLikingIndex === -1) {
          res.status(404).send({message: 'Unable to Unliking'});
          return;
        }

        user.liking.splice(userLikingIndex, 1);
        return user.save();
      })
    );
    return Promise.all(promises)
    .then(() => {
      res.json({status: 'success', like: false, likeCount: unLikeUser.likers.length, likedUserId: unLikerId, likingUserId: req.user._id})
    })
  })
  .catch(next);
}

function remove(req, res, next) {
  req.userModel.remove(() => {
    res.json(req.userModel);
  })
  .catch(next);
}

function getUserByID(req, res, next, id) {
  User.findById(id)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.userModel = user;
    next();
  })
  .catch(next);
}

function getProfile(req, res, next) {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.userModel = user;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  like,
  mostLiked,
  unlike,
  remove,
  getUserByID,
  getProfile,
};
