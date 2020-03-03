const express = require('express');

const router = express.Router();

const submissionsController = require('./submissionsController');

router.get('/:page', submissionsController.getSubmissionsByPage);

router.get('/id/:submission_id', submissionsController.getSubmissionById);

router.get('/author/:author', submissionsController.getSubmissionsByAuthor);

module.exports = router;