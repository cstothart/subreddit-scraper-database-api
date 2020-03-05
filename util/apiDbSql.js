const { DateTime } = require('luxon');

const apiDb = require('./apiDb');

exports.createDashboardTable = () => {
    const last_updated = DateTime.local().setZone('America/New_York').toISO();
    apiDb.schema.hasTable('dashboard')
    .then((exists) => {
        if(!exists) {
            return apiDb.schema.createTable('dashboard', (table) => {
                table.increments();
                table.integer('total_submissions');
                table.integer('total_comments');
                table.integer('total_submission_authors');
                table.integer('total_comment_authors');
                table.datetime('last_updated', options={useTz: false});
            })
            // Insert default values.
            .then(() => {
                return apiDb('dashboard').insert({
                    total_submissions: 999,
                    total_comments: 999,
                    total_submission_authors: 999,
                    total_comment_authors: 999,
                    last_updated: last_updated
                })
            });
        }
    });
}