const express = require('express');
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').trim().not().isEmpty(),
    check('username', 'Username must be at least 3 characters long').isLength({ min: 3 }),
    check('password', 'Password is required').trim().not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('email', 'Please enter a valid email').isEmail(),
    check('firstName', 'First name is required').trim().not().isEmpty(),
    check('lastName', 'Last name is required').trim().not().isEmpty(),
    check('profileImageUrl', 'Please enter a valid image URL').trim().optional().matches(/\.(jpeg|jpg|gif|png)$/),
    check('bio', 'Bio cannot be more than 500 characters long').trim().optional().isLength({ max: 500 }),
  ],
  register,
);
router.post('/login', login);

module.exports = router;
