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

// if a view is not found, return 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});