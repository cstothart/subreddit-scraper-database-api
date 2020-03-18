const express = require('express');
const rateLimit = require("express-rate-limit");

const router = express.Router();

const submissionsController = require('./submissionsController');
const generalFunctions = require('../../util/generalFunctions');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2
});

router.use(generalFunctions.checkForCsv);

router.get('/:page', limiter, submissionsController.getSubmissionsByPage);

router.get('/id/:submission_id', submissionsController.getSubmissionById);

router.get('/author/:author', submissionsController.getSubmissionsByAuthor);

module.exports = router;