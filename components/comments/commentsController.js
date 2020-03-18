const validator = require('validator');

const subredditDbSql = require('../../util/subredditDbSql');

exports.getCommentById = (req, res) => {
    const { comment_id } = req.params;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', {comment_id});
}

exports.getCommentBySubmissionId = (req, res) => {
    const submission_fullname = req.params.submission_id;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', { submission_fullname });
}

exports.getCommentByParentId = (req, res) => {
    const { parent_id } = req.params;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', { parent_id });
}

exports.getCommentsByAuthor = (req, res) => {
    const { author } = req.params;
    subredditDbSql.selectAllFromWhere(req, res, 
        'comments', {author});
}

exports.getCommentsByPage = (req, res) => {
    if(validator.isInt(req.params.page)) {
        const page = req.params.page - 1;
        subredditDbSql.getByPage(req, res, 
            'comments', page)
    } else {
        res.status(400).send('<strong>Page needs to be an integer.</strong>');
    }
}

exports.returnsPerPage = subredditDbSql.returnsPerPage;