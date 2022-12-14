const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // what is the value of req.user????
    console.log('req.user.id:', req.user.id);
    const queryText = `SELECT * FROM "item" ORDER BY "id";`;
    pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error GETing items:', error);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
// POST
router.post('/', (req, res) => {
  console.log ('req.body', req.body);
  console.log ('req.params', req.params);
  const newItem = req.body;
  const queryText = `
      INSERT INTO "item" ("description", "image_url", "user_id")
      VALUES ($1, $2, $3);
  `;
  pool.query(queryText, [newItem.description, newItem.image_url, req.user.id])
  .then((result)=>{
      res.sendStatus(201);
  }).catch((error)=>{
      console.log('AY! error POSTing to db', error);
      res.sendStatus(500)
  })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('This shall be req.params', req.params.id);
  const id = req.params.id
  
  const user = req.user.id
  console.log('This is the user', user);

  const queryText = 'DELETE FROM "item" WHERE id = $1;';

  pool.query(queryText, [id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('something wrong in /shelf DELETE', error);
      res.sendStatus(500);
    })
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
