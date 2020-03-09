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
        .then((result) => {
            return result[0]['count(*)'];
        });
}

getNumAuthors = table => {
    return subredditDb(table)
        .countDistinct('author')
        .then((result) => {
            return result[0]['count(distinct `author`)'];
        });
}

updateDashboardTable = (stats) => {
    return apiDb('dashboard')
        .where('id', '=', 1)
        .update(stats);
} 

(async () => {

    const numSubmissions = await getNumEntries('submissions');
    const numComments = await getNumEntries('comments');

    const numSubmissionAuthors = await getNumAuthors('submissions');
    const numCommentAuthors = await getNumAuthors('comments');

    const last_updated = DateTime.local().setZone('America/Chicago').toISO()

    const stats = {
        Submissions: numSubmissions,
        Comments: numComments,
        Submission_Authors: numSubmissionAuthors,
        Comment_Authors: numCommentAuthors,
        Last_Updated: last_updated
    }

    await updateDashboardTable(stats);

})()
    .then(() => {
        subredditDb.destroy();
        apiDb.destroy();
    });