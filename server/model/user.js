const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  firstname: { type: String, required:  true },
  lastname: { type: String, required:  true },
  email: { type: String, required: true },
  country:{type:String,required:true},
  state:{type:String,required:true},
  city:{type:String,required:true},
  gender:{type:String,required:true},
  dob:{type:String,required:true},
  age:{type:Number,required:true},
  id: { type: String },
});
var PersonModel = mongoose.model('PersonModel', userSchema);
module.exports= PersonModel;