const passport = require('passport');

const User = require('../models/User');

module.exports.login = function(req, res) {
  console.log('Словили попытку залогиниться');
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }
  passport.authenticate('local', function(err, user, info) {
    // error from midleware
    if (err) return res.status(400).json(err);
    // registred user
    if (user) return res.status(200).json({ "token": user.generateJwt() });
    // unknown user or wrong password
    else return res.status(401).json(info);
  })(req, res);
};

module.exports.userProfile = function(req, res) {
  console.log('Словили попытку получить профиль user');
  User.findOne({ _id: req.query._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ message: 'User record not found.' });
            else
                console.log(user);
                user.__v = undefined;
                user.salt = undefined;
                user.hash = undefined;
                return res.status(200).json(user);
        }
    );
}

module.exports.addUser = function(req, res) {
  console.log('Словили POST User');
  
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    logo: req.body.logo,
    card1: req.body.card1,
    card2: req.body.card2,
    card3: req.body.card3,
    phone: req.body.phone,
    site: req.body.site
  });

  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) return res.status(400).json(err);
    if (user) return res.status(200).json({ "token": user.generateJwt() });
  });
};
