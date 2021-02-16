//requires express module from node
const express = require('express');

//connects to port
const PORT = process.env.PORT || 3030;

const app = express();

//serves static content for the app fromt he public directory
app.use(express.static('public'));

//parses app body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//sets handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//import routes and give the server access to them
const routes = require('./controllers/burgers_controller.js');

app.use(routes);

//start our server so that it can listen to client requests
app.listen(PORT, () =>
    console.log(`Server listening on: http://localhost:${PORT}`)
);