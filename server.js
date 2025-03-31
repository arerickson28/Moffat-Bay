const express = require("express");


const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.use(routes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});