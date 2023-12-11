const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Inicializaciones
const app = express();
require('./config/passport');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({ extname: '.hbs', runtimeOptions: { allowProtoPropertiesByDefault: true } }));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.info_msg = req.flash('info_msg');
  res.locals.user = req.user || null;
  next();
});

// Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/mentorings.routes'));
app.use(require('./routes/users.routes'));


// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
