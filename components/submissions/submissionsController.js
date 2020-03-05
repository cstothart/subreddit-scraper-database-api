const subredditDbSql = require('../../util/subredditDbSql');

exports.getSubmissionById = (req, res) => {
    const submission_fullname = req.params.submission_id;
    subredditDbSql.selectAllFromWhere(req, res, 
        'submissions', {submission_fullname});
}

exports.getSubmissionsByAuthor = (req, res) => {
    const { author } = req.params;
    subredditDbSql.selectAllFromWhere(req, res, 
        'submissions', {author});
}

exports.getSubmissionsByPage = (req, res) => {
    const page = req.params.page - 1;
    subredditDbSql.getByPage(req, res, 
        'submissions', page)
}