const db = require('../../util/database');

exports.getSubmissionById = (req, res) => {
    const { submission_id } = req.params;
    db.select('*').from('submissions').where({submission_id})
        .then(submission => {
            if(submission.length) {
                res.status(200).json(submission);
            } else {
                res.status(400).json('Could not find submission.')
            }
        })
        .catch(err => res.status(400).json('Error getting submission.'))
}