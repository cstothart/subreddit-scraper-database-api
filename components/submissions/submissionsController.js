const sqlFunctions = require('../../util/sqlFunctions');

exports.getSubmissionById = (req, res) => {
    const submission_fullname = req.params.submission_id;
    sqlFunctions.selectAllFromWhere(req, res, 'submissions', 
        {submission_fullname});
}

exports.getSubmissionsByAuthor = (req, res) => {
    const { author } = req.params;
    sqlFunctions.selectAllFromWhere(req, res, 'submissions', {author});
}