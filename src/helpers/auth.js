const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Necesitar iniciar sesión para acceder a esta sección')
  res.redirect('/users/login');
}

module.exports = helpers;