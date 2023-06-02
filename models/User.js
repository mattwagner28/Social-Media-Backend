const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/ // Regular expression to match a valid email address
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought' // Referencing the "Thought" model
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Self-referencing the "User" model
  }]
},
   {
      toJSON: {
        virtuals: true,
      },
      id: false,
   }

);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
