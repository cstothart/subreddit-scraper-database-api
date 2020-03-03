const express = require('express');

const submissionsRoutes = require('./components/submissions/submissionsRoutes');
const commentsRoutes = require('./components/comments/commentsRoutes');

const app = express();

app.use('/submissions', submissionsRoutes);
app.use('/comments', commentsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}.`));