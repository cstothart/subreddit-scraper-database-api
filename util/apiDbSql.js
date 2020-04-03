const apiDb = require('./apiDb');

exports.createDashboardTable = () => {
    const last_updated = new Date().toISOString();
    apiDb.schema.hasTable('dashboard')
    .then(exists => {
        if(!exists) {
            return apiDb.schema.createTable('dashboard', table => {
                table.increments();
                table.integer('Submissions');
                table.integer('Comments');
                table.integer('Authors');
                table.integer('Words');
                table.string('Last_Updated');
            })
            // Insert default values.
            .then(() => {
                return apiDb('dashboard').insert({
                    Submissions: 999,
                    Comments: 999,
                    Authors: 999,
                    Words: 999,
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