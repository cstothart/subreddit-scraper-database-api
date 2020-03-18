const express = require('express');
const rateLimit = require("express-rate-limit");

const router = express.Router();

const submissionsController = require('./submissionsController');
const generalFunctions = require('../../util/generalFunctions');

const limiterWindowM = 15;
const limiterMax = 15;
const limiter = rateLimit({
  windowMs: limiterWindowM * 60 * 1000,
  max: limiterMax
});

router.use(generalFunctions.checkForCsv);

router.get('/:page', limiter, submissionsController.getSubmissionsByPage);

router.get('/id/:submission_id', submissionsController.getSubmissionById);

router.get('/author/:author', submissionsController.getSubmissionsByAuthor);

module.exports = {
  router,
  limiterWindowM,
  limiterMax,
  returnsPerPage: submissionsController.returnsPerPage
}