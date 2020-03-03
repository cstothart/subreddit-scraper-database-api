const sqlFunctions = require('../../util/sqlFunctions');

exports.getSubmissionById = (req, res) => {
    const { submission_id } = req.params;
    sqlFunctions.selectAllFromWhere(req, res, 'submissions', {submission_id});
}

exports.getSubmissionsByAuthor = (req, res) => {
    const { author } = req.params;
    sqlFunctions.selectAllFromWhere(req, res, 'submissions', {author});
}