const Content = require('../models/Content');
const Course = require('../models/Course');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get course with contents by ID
const getCourseWithContents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const contents = await Content.find({ course: req.params.id });

    res.json({ ...course.toObject(), contents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new course
const createCourse = async (req, res) => {
  const { title, description, imageUrl } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ message: 'Title must be at least 3 characters long' });
  }
  if (!description || description.length < 10) {
    return res.status(400).json({ message: 'Description must be at least 10 characters long' });
  }

  const course = new Course({
    title,
    description,
    imageUrl,
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update course
const updateCourse = async (req, res) => {
  const { title, description, imageUrl } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ message: 'Title must be at least 3 characters long' });
  }
  if (!description || description.length < 10) {
    return res.status(400).json({ message: 'Description must be at least 10 characters long' });
  }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.title = title || course.title;
    course.description = description || course.description;
    course.imageUrl = imageUrl || course.imageUrl;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await Course.deleteOne({ _id: req.params.id })

    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCourses, getCourseWithContents, createCourse, updateCourse, deleteCourse };
