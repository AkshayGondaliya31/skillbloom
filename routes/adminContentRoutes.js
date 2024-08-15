const express = require('express');
const { getContents, createContent, updateContent, deleteContent } = require('../controllers/adminContentController');
const router = express.Router();

// Get all contents
router.get('/', getContents);

// Create new content
router.post('/', createContent);

// Update content
router.put('/:id', updateContent);

// Delete content
router.delete('/:id', deleteContent);

module.exports = router;
