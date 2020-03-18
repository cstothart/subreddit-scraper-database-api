const { parse } = require('json2csv');

const subredditDb = require('./subredditDb');

exports.selectAllFromWhere = (req, res, from, where) => {
    subredditDb
        .select('*')
        .from(from)
        .where(where)
        .then(result => {
            if(result.length) {
                if(req.csv) {
                    const csv = parse(result);
                    res.setHeader('Content-disposition', 
                                'attachment; filename=data.csv');
                    res.set('Content-Type', 'text/csv');                    
                    res.status(200).send(csv);
                } else {
                    res.status(200).json(result);
                }
            } else {
                res.status(404).send('<strong>Not Found</strong>')
            }
        })
    .catch(err => res.status(500).send('<strong>Unexpected Error</strong>'));
}

exports.getByPage = (req, res, from, page) => {
    const returnsPerPage = 2; //50000;
    const limitOffset = returnsPerPage*page;
    subredditDb
        .select('*')
        .from(from)
        .orderBy('time_entered_into_database')
        .limit(returnsPerPage)
        .offset(limitOffset)
        .then(result => {
            if(result.length) {
                if(req.csv) {
                    const csv = parse(result);
                    res.setHeader('Content-disposition', 
                                'attachment; filename=data.csv');
                    res.set('Content-Type', 'text/csv');                    
                    res.status(200).send(csv);
                } else {
                    res.status(200).json(result);
                }
            } else {
                res.status(404).send('<strong>Not Found</strong>')
            }
        })
        .catch(err => res.status(500).send('<strong>Unexpected Error</strong>'));
}