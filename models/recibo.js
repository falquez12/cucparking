const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  idusuario:String,  
  placa:String,
  horaentrada:String,
  horasalida:String,
  precio:String,

})
module.exports = mongoose.model('recibo', PostSchema);