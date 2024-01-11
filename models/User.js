const { Schema, Types, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: '/^[^\s@]+@[^\s@]+\.[^\s@]+$'
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJson: {
            virtuals: true
        },
        id: false
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', userSchema)

module.exports = User