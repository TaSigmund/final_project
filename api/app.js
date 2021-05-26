/***
 * APPLICATION LOGIC AND SETUP AND DATABASE SETUP
 ***/

'use strict';
// load modules
const express = require('express');
const morgan = require('morgan');

//db setup
const db = require('./models/index.js')
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

// create the Express app
const app = express();

// cross-origin resource sharing based on a code snippet found on:
// https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked
const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());


//parse incoming requests with JSON
app.use(express.json());

//test database connection
(async ()=>{try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}})()

//routes
const usersRoutes = require('./routes/users')
const coursesRoutes = require('./routes/courses')

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Add routes.
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
