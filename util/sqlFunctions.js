const db = require('./database');

exports.selectAllFromWhere = (req, res, from, where) => {
    db.select('*').from(from).where(where)
    .then(result => {
        if(result.length) {
            res.status(200).json(result[0]);
        } else {
            res.status(400).json('Not found.')
        }
    })
    .catch(err => res.status(400).json('Unexpected error.'))
}