## Lab-Steve Lab-12 Documentation

UPDATE BELOW FOR LAB 12!!!

  * index.js employes 'dotenv', imports lib/server.js, and calls a server start script from server.js using the environmental port variable (3000).
  * lib/server.js defines the connection to the database using MongooseJS, sets up the server using Express, and requires route/beer-router.js, which defines all routes for the single-resource API.
  * model/beer.js defines the beer constructor.
  * The following methods will return the following results:
    * GET localhost:3000/api/beers - without a valid ID returns status code 200 and an array of all of the ids for that resource.
    * GET localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx (hexadecimal) - returns status code 200 and a beer object matching a valid ID.
    * POST localhost:3000/api/beers - returns a 400 error code and the details of the error.
    * POST localhost:3000/api/beers name=<NAME> grain=<GRAIN> hops=<HOPS> yeast=<YEAST> - returns status code 201 and a new beer object for a POST request with a valid body.
    * PUT localhost:3000/api/beers - returns a 404 error code and the details of the error if a valid ID is not included.
    * PUT localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx - returns a 202 status code despite missing some required arguments.
    * PUT localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx name=<NAME> grain=<GRAIN> hops=<HOPS> yeast=<YEAST> - returns status code 202 an updated beer object for PUT request with valid ID and ANY NUMBER of parameters that should be changed, for instance, 'PUT localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx grain=<GRAIN>'.
    * DELETE localhost:3000/api/beers - returns a 204 status code and deletes all records for the resource.
    * DELETE localhost:3000/api/beers?id=1 - returns 404 error code and and the details of the error for valid DELETE request made with an ID that was not found.
    * DELETE localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx - returns  204 status code for a DELETE request with a valid ID.
  * Tests - Mocha spins up the server before all tests and spins it down afterwards and tests the routes in route/beer-router.js while employing Expect.
    1. POST localhost:3000/api/beers passes in name='ipa' grain=2Row hops=magnum yeast=s05 - should return 201 status code and an object with name 'IPA' and tests all the other parameters.  'res.body' is then assigned to the 'tempBeer' variable, which is used in the remainder of the tests.
    2. POST localhost:3000/api/beers - should return a 400 error code for a POST request with no body.
    3. GET localhost:3000/api/beers/`${tempBeer._id}` - should return a 200 status code and tempBeer data for the specific ID.
    4. GET localhost:3000/api/beers - should return a 200 status code and an array of beer IDs.
    5. PUT localhost:3000/api/beers/`${tempBeer._id}` - passing in {name: 'pale ale', hops: 'chinook'} should return a 202 status code for valid PUT request with the specific ID with name changed to 'pale ale' and hops changed to 'chinook'.
    6. PUT localhost:3000/api/beers - should return 200 error and status code for PUT request without data sent with nothing changed.
    7. PUT localhost:3000/api/beers/12345 - should return 404 error code for PUT request without a valid ID.
    8. DELETE localhost:3000/api/beers/`${tempBeer._id}` - should return 204 status code and DELETE the record matching the ID.
  * Project passes esLint.
  * NPM Scripts:
    * "test": "mocha" - Runs test scripts.
    * "lint": "eslint ." - Runs esLint on all scripts.
    * "watch": "nodemon index.js" - Runs NodeMon to start the server and watch for changes.
    * "start": "node index.js" - Starts the server.
    * "start-db": "mkdir -p ./db && mongod -dbpath ./db &" - Starts MongoDB daemon.
    * "stop-db": "killall mongod" - Stops MongoDB daemon.
