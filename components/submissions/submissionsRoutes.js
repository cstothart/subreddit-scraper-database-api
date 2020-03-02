const express = require('express');

const router = express.Router();

const submissionsController = require('./submissionsController');

router.get('/:submission_id', submissionsController.getSubmissionById);

module.exports = router;