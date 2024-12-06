const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 443;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
