const router = require('express').Router()

const {
    getUsers,
    singleUser,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require('../../controllers');

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:userId')
    .get(singleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/friendId')
    .put(newFriend)
    .delete(deleteFriend);


module.exports = router