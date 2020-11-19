const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const register = new Schema({
  name: {type: String, unique: true, required: true},
  email: {type: String, unique: true},
  password: {type: String, min:6},
  liked: {type: Array}
})

module.exports = mongoose.model('Users', register);
