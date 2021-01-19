const express = require('express');
const cors = require('cors');
const path = require('path');
const { parse } = require('json2csv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const apiDbSql = require('./util/apiDbSql');
const generalFunctions = require('./util/generalFunctions');
const submissionsRoutes = require('./components/submissions/submissionsRoutes');
const commentsRoutes = require('./components/comments/commentsRoutes');

require('dotenv').config();

const app = express();

// Set up views.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Create the dashboard table if it doesn't already exist.
apiDbSql.createDashboardTable();

app.use(cors());

app.use(helmet());

const limiterWindowM = 15;
const limiterMax = 100;
const limiter = rateLimit({
  windowMs: limiterWindowM * 60 * 1000,
  max: limiterMax
});

app.use(limiter);

app.use('/submissions', submissionsRoutes.router);
app.use('/comments', commentsRoutes.router);

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.get('/stats', generalFunctions.checkForCsv, (req, res) => {
    (async () => {
        const {id, ...databaseStats} = await apiDbSql.getDashboardStats();
        const submissionsByPage = {
            rateLimitWindowM: submissionsRoutes.limiterWindowM,
            rateLimitMax: submissionsRoutes.limiterMax,
            rowsPerPage: submissionsRoutes.returnsPerPage,
            rowsPerPageTest: submissionsRoutes.returnsPerPageTest
        }
        const commentsByPage = {
            rateLimitWindowM: commentsRoutes.limiterWindowM,
            rateLimitMax: commentsRoutes.limiterMax,
            rowsPerPage: commentsRoutes.returnsPerPage,
            rowsPerPageTest: commentsRoutes.returnsPerPageTest
        }
        const general = {
            rateLimitWindowM: limiterWindowM,
            rateLimitMax: limiterMax
        }    
        statsPackage = {
            databaseStats, 
            apiConfig: {
                general,
                submissionsByPage, 
                commentsByPage
            }
        }
        if(req.csv) {
            const csv = parse(statsPackage);
            res.setHeader('Content-disposition', 
                        'attachment; filename=data.csv');
            res.set('Content-Type', 'text/csv');                    
            res.status(200).send(csv);
        } else {
            res.status(200).json(statsPackage);
        }
    })();
})

app.get('/', (req, res) => {
    const fullUrl = req.get('host') + req.originalUrl;
    (async () => {
        const allStats = await apiDbSql.getDashboardStats();
        const prettyStats = generalFunctions.prettifyStats(allStats);
        const { id, 'Last Updated': last_updated, ...stats } = prettyStats;
        res.render('dashboard', {
                lastUpdated: prettyStats['Last Updated'],
                stats: stats,
                fullUrl: fullUrl,
                appTitle: process.env.APP_TITLE
        });
    })();
});

app.get('*', (req, res) => res.status(404).send('<strong>Not Found</strong>'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on port ${port}.`));