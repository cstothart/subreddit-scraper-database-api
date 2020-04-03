const validator = require('validator');

const subredditDbSql = require('../../util/subredditDbSql');

exports.getSubmissionById = (req, res) => {
    const submission_fullname = req.params.submission_id;
    subredditDbSql.selectAllFromWhere(req, res, 
        'submissions', 
        `submissions.submission_fullname='${submission_fullname}'`);
}

exports.getSubmissionsByAuthor = (req, res) => {
    const { author_id } = req.params;
    subredditDbSql.selectAllFromWhere(req, res, 
        'submissions', 
        `CONCAT('srs1-crs-', authors.id)='${author_id}'`);
}

exports.getSubmissionsByPage = (req, res) => {
    if(validator.isInt(req.params.page)) {
        const page = req.params.page - 1;
        subredditDbSql.getByPage(req, res, 
            'submissions', page, req.test)
    } else {
        res.status(400).send('<strong>Page needs to be an integer.</strong>');
    }
}

exports.returnsPerPage = subredditDbSql.returnsPerPage;
exports.returnsPerPageTest = subredditDbSql.returnsPerPageTest;