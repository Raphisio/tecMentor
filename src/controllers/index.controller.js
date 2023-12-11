const indexController = {};

indexController.renderIndex = (req, res) => {
  res.render('home', {
    title: 'Tecmentor - Recibe y da mentorías en el ITSX'
  });
}

indexController.renderRegister = (req, res) => {
  res.render('register', {
    title: 'Tecmentor - Regístrate ahora'
  });
}

module.exports = indexController;