const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');



const users = require('../routes/user');
const auth = require('../routes/auth');
const apiUrlRoot = '/api/' + process.env.VERSION1 + '/';

module.exports = function(app) {
  console.log("apiUrlRoot", apiUrlRoot);
  app.use(apiUrlRoot + 'docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //swagger api doc endpoint
  app.use(apiUrlRoot + 'auth', auth);
  app.use(apiUrlRoot + 'users', users);
}