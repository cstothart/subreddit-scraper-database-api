const { DateTime } = require('luxon');

const apiDb = require('./apiDb');

exports.createDashboardTable = () => {
    const last_updated = DateTime.local().setZone('America/New_York').toISO();
    apiDb.schema.hasTable('dashboard')
    .then(exists => {
        if(!exists) {
            return apiDb.schema.createTable('dashboard', table => {
                table.increments();
                table.integer('Total_Submissions');
                table.integer('Total_Comments');
                table.integer('Total_Submission_Authors');
                table.integer('Total_Comment_Authors');
                table.datetime('Last_Updated', options={useTz: false});
            })
            // Insert default values.
            .then(() => {
                return apiDb('dashboard').insert({
                    Total_Submissions: 999,
                    Total_Comments: 999,
                    Total_Submission_Authors: 999,
                    Total_Comment_Authors: 999,
                    Last_Updated: last_updated
                })
            });
        }
    });
}

exports.getDashboardStats = () => {
    return apiDb('dashboard')
        .select('*')
        .where('id', '=', 1)
        .then((result) => result[0]);
}