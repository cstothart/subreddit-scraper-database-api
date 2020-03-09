const express = require('express');
const cors = require('cors');
const path = require('path');

const apiDbSql = require('./util/apiDbSql');
const generalFunctions = require('./util/generalFunctions');
const submissionsRoutes = require('./components/submissions/submissionsRoutes');
const commentsRoutes = require('./components/comments/commentsRoutes');

const app = express();

// Set up views.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Create the dashboard table if it doesn't already exist.
apiDbSql.createDashboardTable();

app.use(cors());

app.use('/submissions', submissionsRoutes);
app.use('/comments', commentsRoutes);

app.get('/stats', (req, res) => {
    (async () => {
        const allStats = await apiDbSql.getDashboardStats();
        res.status(200).json(allStats);
    })();
})

app.get('/', (req, res) => {
    (async () => {
        const allStats = await apiDbSql.getDashboardStats();
        const prettyStats = generalFunctions.prettifyStats(allStats);
        const { id, 'Last Updated': last_updated, ...stats } = prettyStats;
        res.render('dashboard', {
                lastUpdated: prettyStats['Last Updated'],
                stats: stats
        });
    })();
});

app.get('*', (req, res) => res.status(404).send('<strong>Not Found</strong>'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on port ${port}.`));