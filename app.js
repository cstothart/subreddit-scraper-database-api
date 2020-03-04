const express = require('express');
const cors = require('cors')

const submissionsRoutes = require('./components/submissions/submissionsRoutes');
const commentsRoutes = require('./components/comments/commentsRoutes');

const app = express();

app.use(cors());

app.use('/submissions', submissionsRoutes);
app.use('/comments', commentsRoutes);

app.get('*', (req, res) => res.status(404).send('<strong>Not Found</strong>'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}.`));