const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {

  //GET request to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET request to get any thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //POST request to add a new thought, and have that thought saved to User thought array
  async createThought(req, res) {
    try {
      const userId = req.body.userID;
      const thoughtText = req.body.thoughtText;

      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Thought not found");
      }

      const thought = new Thought({
        thoughtText,
        username: user.username,
      });

      user.thoughts.push(thought);
      await thought.save();
      await user.save();

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error posting thought" });
    }
  },

    // PUT request to update thought by ID
    async updateThought(req, res) {
      try {
        const updatedThought = await Thought.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.json(updatedThought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

      // DELETE request to remove user by ID
    async deleteThought(req, res) {
      try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        res.json(deletedThought);
      } catch (err) {
        res.status(500).json(err);
      }
    },


// POST request to post new reaction
async postReaction(req, res) {
  try {
    const reactionText = req.body.reactionBody;
    const username = req.body.username;

    const thought = await Thought.findById(req.params.id);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    const newReaction = {
      reactionBody: reactionText,
      username: username,
    };

    thought.reactions.push(newReaction);
    await thought.save();

    res.json(newReaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting reaction" });
  }
},

// DELETE request to delete a reaction
async deleteReaction(req, res) {
  try {
    const { thoughtId, id } = req.params;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: id } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    res.json({ message: 'Reaction deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
}



};