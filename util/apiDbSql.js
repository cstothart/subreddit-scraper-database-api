const apiDb = require('./apiDb');

exports.createDashboardTable = () => {
    apiDb.schema.hasTable('dashboard')
    .then((exists) => {
        if(!exists) {
            return apiDb.schema.createTable('dashboard', (table) => {
                table.increments();
                table.integer("total_submissions");
                table.integer("total_comments");
                table.integer("total_words");
                table.datetime("last_updated");
            })
            .catch(err => res.status(500)
                .send('<strong>Unexpected Error</strong>'));
        }
    });
}