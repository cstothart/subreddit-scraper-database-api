const sqlFunctions = require('../../util/sqlFunctions');

exports.getCommentById = (req, res) => {
    const { comment_id } = req.params;
    sqlFunctions.selectAllFromWhere(req, res, 'comments', {comment_id});
}

exports.getCommentBySubmissionId = (req, res) => {
    const submission_fullname = req.params.submission_id;
    sqlFunctions.selectAllFromWhere(req, res, 'comments', { submission_fullname });
}

exports.getCommentByParentId = (req, res) => {
    const { parent_id } = req.params;
    sqlFunctions.selectAllFromWhere(req, res, 'comments', { parent_id });
}

exports.getCommentsByAuthor = (req, res) => {
    const { author } = req.params;
    sqlFunctions.selectAllFromWhere(req, res, 'comments', {author});
}

exports.getCommentsByPage = (req, res) => {
    const page = req.params.page - 1;
    sqlFunctions.getByPage(req, res, 'comments', page)
}