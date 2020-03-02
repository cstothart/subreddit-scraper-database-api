const express = require('express');

const submissionsRoutes = require('./components/submissions/submissionsRoutes');

const app = express();

app.use('/submissions', submissionsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}.`));