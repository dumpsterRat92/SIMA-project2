// Import necessary modules and functions
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Function to connect Sequelize with session store
// const seedAll = require('./seeds')

const sequelize = require('./config/connection'); // Sequelize setup for database connection
const routes = require('./controllers'); // Importing routes from the controllers directory
const helpers = require('./utils/helpers'); // Importing helper functions for handlebars

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3001; // Set the port from environment or default to 3001

// Configuration object for session middleware
const sess = {
    name: 'billyBob', // Session identifier name
    secret: 'Super secret', // Secret used to sign the session ID cookie
    cookie: { maxAge: 60000 }, // Cookie options, setting expiration to 60 seconds
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    rolling: false, // Don't force a session identifier cookie to be set on every response
    store: new SequelizeStore({
      db: sequelize, // Passing the Sequelize instance to store session data in the database
    }),
};

app.use(session(sess)); // Apply the session middleware to the Express app

const hbs = exphbs.create({ helpers }); // Create a new instance of express-handlebars with helpers

app.engine('handlebars', hbs.engine); // Register handlebars as the view engine
app.set('view engine', 'handlebars'); // Set handlebars as the view engine

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

app.use(routes); // Use the imported routes as middleware

// Sync all models with the database, then start the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening')); // Start the server on the specified port
});
