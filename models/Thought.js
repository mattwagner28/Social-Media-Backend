const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp) // Custom getter method to format the timestamp
    }
  },
  {
    _id: false // Disable generating an automatic _id for each reaction
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
 }
);

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp) // Custom getter method to format the timestamp
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
