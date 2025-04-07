// pull in the express server framework
const express = require("express");

// pulls in all routes created in the conrollers folder
// (it looks at the index.js file in the controllers folder)
const routes = require('./controllers');

// create an express serer
const app = express();

// use port 3001 if environment variables are not found
const PORT = process.env.PORT || 3001;

// format calls and responses to and from server in json form
app.use(express.json());

// server should use the routes we've pulled in
app.use(routes);

// if the user tries to hit an endpoint that doesn't exist, send back this error
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found. Does your route require an api path variable?' });
});

// start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});