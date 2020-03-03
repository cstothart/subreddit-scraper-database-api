const database = require('./database');

exports.selectAllFromWhere = (req, res, from, where) => {
    database
        .select('*')
        .from(from)
        .where(where)
        .then(result => {
            if(result.length) {
                res.status(200).json(result);
            } else {
                res.status(404).send('<strong>Not Found</strong>')
            }
        })
    .catch(err => res.status(500).send('<strong>Unexpected Error</strong>'));
}