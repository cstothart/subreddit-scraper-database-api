const validator = require('validator');

const subredditDbSql = require('../../util/subredditDbSql');

exports.getCommentById = (req, res) => {
    const comment_fullname = req.params.comment_id;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', 
        `comments.comment_fullname='${comment_fullname}'`);
}

exports.getCommentBySubmissionId = (req, res) => {
    const submission_fullname = req.params.submission_id;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', 
        `comments.submission_fullname='${submission_fullname}'`);
}

exports.getCommentByParentId = (req, res) => {
    const { parent_id } = req.params;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', 
        `comments.parent_id='${parent_id}'`);
}

exports.getCommentsByAuthor = (req, res) => {
    const { author_id } = req.params;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', 
        `CONCAT('srs1-crs-', authors.id)='${author_id}'`);
}

exports.getCommentsByPage = (req, res) => {
    if(validator.isInt(req.params.page)) {
        const page = req.params.page - 1;
        subredditDbSql.getByPage(req, res, 
            'comments', page, req.test)
    } else {
        res.status(400).send('<strong>Page needs to be an integer.</strong>');
    }
}

exports.returnsPerPage = subredditDbSql.returnsPerPage;
exports.returnsPerPageTest = subredditDbSql.returnsPerPageTest;