const subredditDb = require('./subredditDb');

exports.selectAllFromWhere = (req, res, from, where) => {
    subredditDb
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

exports.getByPage = (req, res, from, page) => {
    const returnsPerPage = 5000;
    const limitOffset = returnsPerPage*page;
    subredditDb
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