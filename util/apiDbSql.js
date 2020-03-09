const { DateTime } = require('luxon');

const apiDb = require('./apiDb');

exports.createDashboardTable = () => {
    const last_updated = DateTime.local().setZone('America/New_York').toISO();
    apiDb.schema.hasTable('dashboard')
    .then(exists => {
        if(!exists) {
            return apiDb.schema.createTable('dashboard', table => {
                table.increments();
                table.integer('Submissions');
                table.integer('Comments');
                table.integer('Submission_Authors');
                table.integer('Comment_Authors');
                table.datetime('Last_Updated', options={useTz: false});
            })
            // Insert default values.
            .then(() => {
                return apiDb('dashboard').insert({
                    Submissions: 999,
                    Comments: 999,
                    Submission_Authors: 999,
                    Comment_Authors: 999,
                    Last_Updated: last_updated
                })
            }).catch(console.log)
        }
    });
}

exports.getDashboardStats = () => {
    return apiDb('dashboard')
        .select('*')
        .where('id', '=', 1)
        .then((result) => result[0]);
}