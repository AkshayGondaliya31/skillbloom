const express = require('express');
const { getCourses, createCourse, updateCourse, deleteCourse, getCourseWithContents } = require('../controllers/adminCourseController');
const router = express.Router();

// Get all courses
router.get('/', getCourses);

// Get course with contents by ID
router.get('/:id/contents', getCourseWithContents);

// Create new course
router.post('/', createCourse);

// Update course
router.put('/:id', updateCourse);

// Delete course
router.delete('/:id', deleteCourse);

module.exports = router;
