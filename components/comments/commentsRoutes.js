const express = require('express');
const rateLimit = require("express-rate-limit");
const { param, validationResult } = require('express-validator');

const router = express.Router();

const commentsController = require('./commentsController');
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
  commentsController.getCommentsByPage);

router.get('/:page/test',
  [param('page').escape()],
  (req, res, next) => {
    req.test = true;
    next();
  },
  commentsController.getCommentsByPage);

router.get('/id/:comment_id',
  [param('comment_id').escape()],
  commentsController.getCommentById);

router.get('/submission_id/:submission_id',
  [param('submission_id').escape()],
  commentsController.getCommentBySubmissionId);

router.get('/parent_id/:parent_id',
  [param('parent_id').escape()], 
  commentsController.getCommentByParentId);           

router.get('/author_id/:author_id',
  [param('author_id').escape()],
  commentsController.getCommentsByAuthor);

module.exports = {
  router,
  limiterWindowM,
  limiterMax,
  returnsPerPage: commentsController.returnsPerPage,
  returnsPerPageTest: commentsController.returnsPerPageTest
}