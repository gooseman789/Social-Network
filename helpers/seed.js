const db = require('../config/connection')
const { Thought, User } = require('../models')
const thoughtSeeds = require('./thoughtSeed')
const userSeeds = require('./userSeeds')



db.once('open', async () => {
    // console.log(thoughtSeeds)
    // console.log(userSeeds)
    const users = await User.insertMany(userSeeds)
    const thoughts = await Thought.insertMany(thoughtSeeds)
    for (const thought of thoughts) {
        console.log(users);
        console.log(thoughts);
        console.log(thought.username);

        await User.findOneAndUpdate(
            { username: thought.username },
            { $push: { thoughts: thought._id } }, 
            { new: true }
        );
    }


    console.log('all done')
    process.exit(0)
})

