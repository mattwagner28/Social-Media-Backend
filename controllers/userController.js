const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // GET request for all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET request for a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST request to create a new user 
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT request to update user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // DELETE request to remove user by ID, AND the thoughts associated with the user
async deleteUser(req, res) {
  try {
    const userId = req.params.id;

    // Delete the user and retrieve the deleted user document
    const deletedUser = await User.findByIdAndDelete(userId);

    // Retrieve the thoughts associated with the deleted user
    const thoughtIds = deletedUser.thoughts;

    // Delete the thoughts associated with the user
    await Thought.deleteMany({ _id: { $in: thoughtIds } });

    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
},


  // POST request to update with a friend 
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $push: {
            friends: req.params.friendId
          }
        }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE request to delete a friend by ID
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $pull: {
            friends: req.params.friendId
          }
        }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
