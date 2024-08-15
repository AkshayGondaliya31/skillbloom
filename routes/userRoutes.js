const express = require('express');
const { getUserDashboard, getAllCourses, enrollInCourse, getUserProfile, updateUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();
const { check } = require('express-validator');

router.get('/dashboard', auth, getUserDashboard);
router.get('/courses', auth, getAllCourses);
router.post('/courses/enroll', auth, enrollInCourse);
router.put(
  '/profile',
  auth,
  [
    check('email', 'Please enter a valid email').trim().isEmail(),
    check('firstName', 'First name is required').trim().not().isEmpty(),
    check('lastName', 'Last name is required').trim().not().isEmpty(),
    check('profileImageUrl', 'Please enter a valid image URL').trim().optional().matches(/\.(jpeg|jpg|gif|png)$/),
    check('bio', 'Bio cannot be more than 500 characters long').trim().optional().isLength({ max: 500 }),
  ],
  updateUserProfile,
);
router.get('/profile', auth, getUserProfile);

module.exports = router;
