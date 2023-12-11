const usersController = {};
const passport = require('passport');
const User = require('../models/User');

usersController.renderRegisterForm = (req, res) => {
  res.render('users/register', {
    title: 'TecMentor - Regístrate y únete!'
  })
}

usersController.register = async (req, res) => {
  const error_msg = [];
  const {profile_photo, name, last_name, control_number, phone, email, password, confirm_password} = req.body;
  if (password != confirm_password) {
    error_msg.push({text: 'Las contraseñas no coinciden'});
  }
  if (password.length < 8) {
    error_msg.push({text: 'La contraseña debería de tener al menos 8 carácteres'});
  }
  if (error_msg.length > 0) {
    res.render('users/register', {
      error_msg,
      profile_photo,
      name,
      last_name,
      control_number,
      phone,
      email
    })
  } else {
    const emailUser = await User.findOne({email: email});
    const controlNumber = await User.findOne({control_number: control_number});

    if(emailUser) {
      req.flash('error_msg', 'El correo ya está registrado');
      res.redirect('/users/register');
    }
    if(controlNumber) {
      req.flash('error_msg', 'El número de control ya está registrado');
      res.redirect('/users/register');
    } else {
      const newUser = new User({profile_photo, name, last_name, control_number, phone, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', ' Usuario registrado con éxito');
      res.redirect('/users/login');
    }
  }
}

usersController.renderLoginForm = (req, res) => {
  res.render('users/login', {
    title: 'TecMentor - Inicia sesión'
  })
}

usersController.login = passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/mentorings',
  failureFlash: true
});

usersController.logout = (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al cerrar sesión');
    }
    req.flash('success_msg', 'Has cerrado sesión');
    res.redirect('/users/login');
  });
};

module.exports = usersController;