const { parse } = require('json2csv');

const subredditDb = require('./subredditDb');

const returnsPerPageNoTest = 50000;
const returnsPerPageTest = 10;

const authorCode = 'srs1-crs-';

const submissionColumns = [
    'submissions.submission_fullname',
    'submissions.title',
    'submissions.num_comments',
    'submissions.score',
    'submissions.upvote_ratio',
    'submissions.created_utc',
    'submissions.body'
].join();

const commentColumns = [
    'comments.comment_fullname',
    'comments.submission_fullname',
    'comments.parent_id',
    'comments.score',
    'comments.created_utc',
    'comments.edited',
    'comments.body'
].join();

exports.selectAllFromWhere = (req, res, from, where) => {
    let columns;
    if(from === 'submissions') {
        columns = submissionColumns;
    } 
    else if(from === 'comments') {
        columns = commentColumns;
    }
    subredditDb
        .select(subredditDb.raw(`${columns}, 
            REPLACE(${from}.author, authors.author, 
                CONCAT('${authorCode}', authors.id)) AS author_id`))
        .from(from)
        .leftOuterJoin('authors', `${from}.author`, 'authors.author')
        .where(subredditDb.raw(where))
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
    .catch(console.log) //err => res.status(500).send('<strong>Unexpected Error</strong>'));
}

exports.getByPage = (req, res, from, page, test) => {
    let returnsPerPage;
    if(test) {
        returnsPerPage = returnsPerPageTest;
    } else {
        returnsPerPage = returnsPerPageNoTest;
    }
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

exports.returnsPerPage = returnsPerPageNoTest;
exports.returnsPerPageTest = returnsPerPageTest;