const { User, Thought, Reaction } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()

            res.json(users)
        } catch (err) {
            console.log("testAll" + err)
            return res.status(500).json(err)
        }
    },
    async singleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId}).select('-__v')
            .populate({
                path: 'thoughts',
                model: 'Thought'
            })
            .populate({
                path: 'friends',
                model: User
            })

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'})
            }
            res.json({ user })
        } catch (err) {
            console.log('test1' + err)
            res.status(500).json({message: 'Server Error'})
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true}
            )
            if (!user) {
                res.status(400).json({message: 'No user with this id!'})
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId}
            )
            if (!user) {
                res.status(400).json({ message: "No user with this id!"})
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async newFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findOneAndUpdate(
                { _id: userId},
                { $push: { friends: friendId} },
                { new: true }
            ) 
            if (!user) {
                res.status(400).json({message: "No user with this id!"})
            } 
            if (!user.friends.includes(friendId)) {
                user.friends.push(friendId)
                await user.save()
            }
            return user
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteFriend(req,res) {
        try {
            const { userId, friendId } = req.params
            const user = await User.findOneAndDelete(
                { _id: userId },
                { $pull: { friends: friendId} },
                { new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'User not found!'})
            }
            return res,json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async allThoughts(req, res) {
        try {
            const thought = await Thought.find()
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async singleThought(req, res) {
        try {
            const thought = await Thought.findOne(
                { _id: req.params.courseId}
            ).select('-__v')
            if (!thought) {
                return res.status(404).json({message: "No thought found with that id!"})
            }
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)            
        }
    },
    async newThought(req, res) {
        try {
            const thought = await Thought.create({
                thoughtText: req.body.thoughttext,
                username: req.body.username
            })
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: {thoughts: thought._id} },
                { new: true}
            )
            res.json({ thought, user })
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought= await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body},
                { runValidators: true, new: true}
            )
            if (!thought) {
                res.status(400).json({message: 'No thought with this id!'})
            }
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.body.thoughtId}
            )
            if (!thought) {
                res.status(400).json({message: 'No thought with this id!'})
            }
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async updateReaction(req, res) {
        try  {
            const { reactionId } = req.body
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtid},
                { $push: {reactions: reactionId} },
                { runValidators: true, new: true}
            )
            return res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const { reactionId } = req.params
            const thought = await Thought.findOneAndUpdate(
                { 'reactions.reactionId': reactionId},
                { $pull: {reactions: {reactionId}}},
                { new: true}
            )
            if (!thought) {
                return res.status(404).json({ error: "Thought not found"})
            }
            return res.json(thought)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}