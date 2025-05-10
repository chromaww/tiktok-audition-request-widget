// routes.js
const path = require('path');
const express = require('express');
const router = express.Router();

// Serve index.html at /
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Serve viewer.html at /viewer
router.get('/viewer', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/viewer.html'));
});

module.exports = router;