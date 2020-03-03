const database = require('../../util/database');
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

exports.getSubmissionsByPage = (req, res) => {
    const from = 'submissions';

    const page = req.params.page - 1;
    const returnsPerPage = 2;
    const limitOffset = returnsPerPage*page;
    database
        .select('*')
        .from(from)
        .orderBy('time_entered_into_database')
        .limit(returnsPerPage)
        .offset(limitOffset)
        .then(result => {
            if(result.length) {
                res.status(200).json(result);
            } else {
                res.status(404).send('<strong>Not Found</strong>')
            }
        })
        .catch(err => res.status(500).send('<strong>Unexpected Error</strong>'));
}