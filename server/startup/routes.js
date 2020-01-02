const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');



const user = require('../routes/user');
const diocese = require('../routes/diocese');
const society = require('../routes/society');
const auth = require('../routes/auth');
const apiUrlRoot = '/api/' + process.env.VERSION1 + '/';

module.exports = function(app) {
  console.log("apiUrlRoot", apiUrlRoot);
  app.use(apiUrlRoot + 'docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //swagger api doc endpoint
  app.use(apiUrlRoot + 'auth', auth);
  app.use(apiUrlRoot + 'users', user);
  app.use(apiUrlRoot + 'dioceses', diocese);
  app.use(apiUrlRoot + 'societies', society);
}