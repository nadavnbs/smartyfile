const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const loginApi = require('./server/routes/login_api');
const fileApi = require('./server/routes/file_api');
const foldersApi = require('./server/routes/folder_api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/docSetup')));
app.use(express.static(path.join(__dirname, 'node_modules')));


// Set our api routes
// app.use('/', api)
app.use('/login_api', loginApi);
app.use('/file_api', fileApi);
app.use('/folder_api', foldersApi);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/docSetup/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));