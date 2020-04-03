/* 
This script is meant to be run by a scheduler (e.g., cron, 
Heroku Scheduler, etc.).
*/

const { DateTime } = require('luxon');

const subredditDb = require('../util/subredditDb');
const apiDb = require('../util/apiDb');

getNumEntries = table => {
    return subredditDb(table)
        .count('*')
        .then(result => result[0]['count(*)']);
}

getNumWords = table => {
    return subredditDb(table)
        .select(subredditDb.raw(
            `sum(LENGTH(body) - LENGTH(REPLACE(body, ' ', '')) + 1)`
            )
        )
        .then(result => result[0]["sum(LENGTH(body) - LENGTH(REPLACE(body, ' ', '')) + 1)"]);
}

updateDashboardTable = (stats) => {
    return apiDb('dashboard')
        .where('id', '=', 1)
        .update(stats);
} 

(async () => {

    const numSubmissions = await getNumEntries('submissions');
    const numComments = await getNumEntries('comments');
    const numAuthors = await getNumEntries('authors');

    const numWordsSubmissions = await getNumWords('submissions');
    const numWordsComments = await getNumWords('submissions');
    const numWords = numWordsSubmissions + numWordsComments;
    
    const last_updated = new Date().toISOString();

    const stats = {
        Submissions: numSubmissions,
        Comments: numComments,
        Authors: numAuthors,
        Words: numWords,
        Last_Updated: last_updated
    }

    await updateDashboardTable(stats);

})()
    .then(() => {
        subredditDb.destroy();
        apiDb.destroy();
    });