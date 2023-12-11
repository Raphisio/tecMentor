const { Router } = require('express');
const router = Router();
const { 
  renderRegisterForm,
  renderLoginForm,
  login,
  register,
  logout
} = require('../controllers/users.controller')

router.get('/users/register', renderRegisterForm);
router.post('/users/register', register);

router.get('/users/login', renderLoginForm);
router.post('/users/login', login);

router.get('/users/logout', logout);

module.exports = router;