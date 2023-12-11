// Configuración
const mongoose = require('mongoose');

const { MONGODB_HOST, MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;
mongoose.connect(MONGODB_URI)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexión a mongodb:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
})