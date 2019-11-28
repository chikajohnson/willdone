// require('dotenv');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


const schools = require('../routes/school');
const schoolTypes = require('../routes/schoolType');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const apiUrlRoot = '/api/' + process.env.VERSION1 + '/';

module.exports = function(app) {
  console.log(apiUrlRoot);
  app.use(apiUrlRoot + 'docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //swagger api doc endpoint
  app.use(apiUrlRoot + 'schools', schools);
  app.use(apiUrlRoot + 'schooltypes', schoolTypes);
  app.use(apiUrlRoot + 'users', users);
  app.use(apiUrlRoot + 'auth', auth);
  app.use(error);
}