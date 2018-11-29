const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const isAdmin = require('../modules/isAdmin');


const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  pool.query(`SELECT * FROM "person" WHERE "id"=$1;`, [req.user.id])
  .then(results => {
    res.send(results.rows[0]);
  })
  .catch(err => {
    console.log('Error getting user info', err);
  })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', rejectUnauthenticated, isAdmin, (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const organization = req.body.organization;
  const phone_number = req.body.phone_number;
  const is_facilitator = req.body.is_facilitator;
  const is_admin = req.body.is_admin;

  const queryText = 'INSERT INTO person (username, password, first_name, last_name, email, organization, phone_number, is_facilitator, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
  pool.query(queryText, [username, password, first_name, last_name, email, organization, phone_number, is_facilitator, is_admin])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/register', rejectUnauthenticated, isAdmin, (req, res) => { // will leave "password" as editable until we have set up 
  const updatedFacilitator = req.body;  // functionality for facilitator to change own password
  console.log('in the edit function');
  console.log(req.body);
  pool.query(`UPDATE person
  SET "username" = $1,
  "first_name" = $2, 
  "last_name" = $3,  
  "email" = $4,
  "organization" = $5, 
  "phone_number" = $6, 
  "is_facilitator" = $7, 
  "is_admin" = $8
  WHERE "id"=$9`,
    [req.body.username,
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.organization,
    req.body.phone_number,
    req.body.is_facilitator,
    req.body.is_admin,
    req.body.id])
    .then((results) => {
      res.sendStatus(200)
    }).catch((error) => {
      console.log('Error with server-side PUT:', error);
      res.send(500);
    })
})

router.get('/register', rejectUnauthenticated, isAdmin, (req, res) => {
  console.log('get facilitators');
  pool.query(`SELECT "username", "first_name", "last_name", "email", "organization", "phone_number", "is_facilitator", "is_admin", "id"
  FROM "person";`)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log('Error GET /facilitators', error);
      res.sendStatus(500);
    })
});

router.delete('/register', rejectUnauthenticated, isAdmin, (req, res) => {
  pool.query(`DELETE FROM "person"
  WHERE "first_name"=$1 AND "last_name"=$2;`,
      [req.body.first_name,
      req.body.last_name])
      .then((results) => {
          res.sendStatus(200)
      }).catch((error) => {
          console.log('Error with server-side DELETE:', error);
          res.sendStatus(500);
      })
});


module.exports = router;
