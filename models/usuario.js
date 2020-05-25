const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema({
  email:String,  
  pass:String,
  name:String,
  placa:String,  
})

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('usuario', UserSchema);