const { Router } = require('express');
const router = Router();

// Importando rutas desde el controlador
const { renderIndex, renderRegister } = require('../controllers/index.controller');

router.get('/', renderIndex);
router.get('/register', renderRegister);

module.exports = router;