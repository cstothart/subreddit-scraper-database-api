const express = require('express');
const rateLimit = require("express-rate-limit");

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

router.get('/:page', limiter, commentsController.getCommentsByPage);

router.get('/id/:comment_id', commentsController.getCommentById);

router.get('/submission_id/:submission_id', 
           commentsController.getCommentBySubmissionId);

router.get('/parent_id/:parent_id', 
           commentsController.getCommentByParentId);           

router.get('/author/:author', commentsController.getCommentsByAuthor);

module.exports = {
  router,
  limiterWindowM,
  limiterMax,
  returnsPerPage: commentsController.returnsPerPage
}