const mentoringsController = {};

const Mentoring = require('../models/Mentoring');

mentoringsController.renderMentoringForm = (req, res) => {
  res.render('mentorings/new-mentoring', {
    title: 'TecMentor - Agrega una nueva mentoría'
  });
}

mentoringsController.createNewMentoring = async (req, res) => {
  const { mentoringClass, mentoringTopic, mentoringAvailability, mentoringDescription } = req.body;

  const newMentoring = new Mentoring({ mentoringClass, mentoringTopic, mentoringAvailability, mentoringDescription });

  try {
    newMentoring.mentoringUser = req.user.id;
    await newMentoring.save();
    req.flash('success_msg', 'Mentoría añadida correctamente!');
    res.redirect('/mentorings');
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      // Manejar errores de validación de Mongoose
      res.status(400).json({ error: error.message });
    } else {
      // Manejar otros errores internos del servidor
      res.status(500).send('Error interno del servidor al guardar el mentoring');
    }
  }
}

mentoringsController.renderMentorings = async (req, res) => {
  try {
    const allMentorings = await Mentoring.find().populate('mentoringUser', 'name'); // Todas las mentorías
    const userMentorings = await Mentoring.find({ mentoringUser: req.user.id }).populate('mentoringUser', 'name');
    const isOwner = userMentorings.map(m => m.mentoringUser.id);
    res.render('mentorings/all-mentorings', { allMentorings, userMentorings, isOwner, title: 'TecMentor - Todas las mentorías'});
    console.log('All Mentorings:', allMentorings);
    console.log('User Mentorings:', userMentorings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al obtener las mentorías');
  }
};

mentoringsController.renderEditMentoring = async (req, res) => {
  const mentoring = await Mentoring.findById(req.params.id);
  console.log(mentoring)
  res.render('mentorings/edit-mentoring', {mentoring});
}

mentoringsController.updateMentoring = async(req, res) => {
  const { mentoringClass, mentoringTopic, mentoringAvailability, mentoringDescription } = req.body;
  await Mentoring.findByIdAndUpdate(req.params.id, { mentoringClass, mentoringTopic, mentoringAvailability, mentoringDescription });
  req.flash('info_msg', 'Mentoría editada correctamente!');
  res.redirect('/mentorings');
}

mentoringsController.deleteMentoring = async (req, res) => {
  await Mentoring.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Mentoría eliminada correctamente!');
  res.redirect('/mentorings'); 
}

module.exports = mentoringsController;