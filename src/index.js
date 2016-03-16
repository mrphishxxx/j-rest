/**
 * This is the boilerplate repository for creating joules.
 * Forking this repository should be the starting point when creating a joule.
 */

/*
 * The handler function for all API endpoints.
 * The `event` argument contains all input values.
 *    event.httpMethod, The HTTP method (GET, POST, PUT, etc)
 *    event.{pathParam}, Path parameters as defined in your .joule.yml
 *    event.{queryStringParam}, Query string parameters as defined in your .joule.yml
 */
var Response = require('joule-node-response');
var JouleNodeDatabase = require('joule-node-database');

exports.handler = function(event, context) {
  var response = new Response();
  var testDb = new JouleNodeDatabase();
  var lastAccessedKey = 'lastAccessed';

  response.setContext(context);
  response.setHeader('Content-Type', 'application/json');

  // We fetch a key from the database
  testDb.get(lastAccessedKey)
    .done(function(data) {
      // store the last accessed time so we can output it
      if(data === null) {
        lastAccessed = 'N/A';
      } else {
        lastAccessed = data['lastAccessed'] || 'N/A';
      }

      // set the last accessed time to the current time
      testDb.set(lastAccessedKey, {lastAccessed: (new Date()).toString()})
        .done(function(data) {
          // create the response object and send it back
          var result = {message: ' Last accessed at ' + lastAccessed};
          response.send(result);
      });
    });
};
