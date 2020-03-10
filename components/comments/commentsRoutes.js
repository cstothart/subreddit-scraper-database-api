const express = require('express');

const router = express.Router();

const commentsController = require('./commentsController');
const generalFunctions = require('../../util/generalFunctions');

router.use(generalFunctions.checkForCsv);

router.get('/:page', commentsController.getCommentsByPage);

router.get('/id/:comment_id', commentsController.getCommentById);

router.get('/submission_id/:submission_id', 
           commentsController.getCommentBySubmissionId);

router.get('/parent_id/:parent_id', 
           commentsController.getCommentByParentId);           

router.get('/author/:author', commentsController.getCommentsByAuthor);

module.exports = router;