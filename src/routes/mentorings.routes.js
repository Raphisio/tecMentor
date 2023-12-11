const { Router } = require('express');
const router = Router();

const { 
  renderMentoringForm, 
  createNewMentoring, 
  renderMentorings,
  renderEditMentoring, 
  updateMentoring, 
  deleteMentoring
} = require('../controllers/mentorings.controller');

const { isAuthenticated } = require('../helpers/auth');

// Métodos para agregar mentorias
router.get('/mentorings/add', isAuthenticated, renderMentoringForm);
router.post('/mentorings/new-mentoring', isAuthenticated, createNewMentoring);

// Métodos para obtener mentorías
router.get('/mentorings', isAuthenticated, renderMentorings);

// Editar mentorías
router.get('/mentorings/edit/:id', isAuthenticated, renderEditMentoring);
router.put('/mentorings/edit/:id', isAuthenticated, updateMentoring);

// Borrar mentorías
router.delete('/mentorings/delete/:id', isAuthenticated, deleteMentoring);

module.exports = router;