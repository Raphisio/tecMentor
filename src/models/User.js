const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  profile_photo: { type: String, required: false, trim: true },
  name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  control_number: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'El correo electrónico no tiene un formato válido'] },
  password: {type: String, required: true}
});

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);