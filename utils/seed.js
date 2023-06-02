const db = require("../config/connection")
const { User, Thought } = require ('../models');
const usersData = require("./users.json")
const thoughtsData = require("./thoughts.json")

const seedUsers = async () => {
    try {
        db.once('open', async () => {
            await User.deleteMany({})
            await User.insertMany(usersData)
          
            console.log("Seeding done!")
          });
      } catch (err) {
        console.log(err)
      }
}

const seedThoughts = async () => {
  try {
      db.once('open', async () => {
          await Thought.deleteMany({})
          await Thought.insertMany(thoughtsData)
        
          console.log("Seeding done!")
        });
    } catch (err) {
      console.log(err)
    }
}

seedUsers();
seedThoughts();