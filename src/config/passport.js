const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
  usernameField: 'userEmail',
  passwordField: 'userPassword'
}, async (email, password, done) => {
  // Comprobar que el correo coincide
  const userData = await User.findOne({email});
  if(!userData) {
    return done(null, false, {message: 'Usuario inexistente'});
  } else {
    // Validar la contraseña del usuario
    const match = await userData.matchPassword(password)
    if (match) {
      return done(null, userData);
    } else {
      return done(null, false, {message: 'Contraseña incorrecta'});
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if(!user) {
      return done(null, false, {message: 'Usuario no encontrado'});
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
})