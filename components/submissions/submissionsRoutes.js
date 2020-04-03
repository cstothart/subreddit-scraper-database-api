const express = require('express');
const rateLimit = require("express-rate-limit");
const { param, validationResult } = require('express-validator');

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

router.get('/:page',
  limiter,
  [param('page').escape()],
  (req, res, next) => {
    req.test = false;
    next();
  },
  submissionsController.getSubmissionsByPage);

router.get('/:page/test',
  [param('page').escape()],
  (req, res, next) => {
    req.test = true;
    next();
  },
  submissionsController.getSubmissionsByPage);

router.get('/id/:submission_id',
  [param('submission_id').escape()],
  submissionsController.getSubmissionById);

router.get('/author_id/:author_id', 
  [param('author_id').escape()],
  submissionsController.getSubmissionsByAuthor);

module.exports = {
  router,
  limiterWindowM,
  limiterMax,
  returnsPerPage: submissionsController.returnsPerPage,
  returnsPerPageTest: submissionsController.returnsPerPageTest
}