const express = require('express');
const { getUsers, updateUser, deleteUser } = require('../controllers/adminUserController');
const router = express.Router();

// Get all users
router.get('/', getUsers);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;
