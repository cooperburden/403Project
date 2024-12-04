// routes/users.js
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await knex('users').select('*');
        res.render('userDatabase', { users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
    }
});

// Display form to add a new user
router.get('/new', (req, res) => {
    res.render('connectUserInput', { user: null });
});

// Add a new user
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, mission_call, home_address, home_city, home_state, home_country, home_zip } = req.body;
        await knex('users').insert({
            first_name,
            last_name,
            mission_call,
            home_address,
            home_city,
            home_state,
            home_country,
            home_zip,
        });
        res.redirect('/users');
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Error adding user');
    }
});

// Display form to edit a user
router.get('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await knex('users').where('user_id', id).first();
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('connectUserInput', { user });
    } catch (err) {
        console.error('Error fetching user for edit:', err);
        res.status(500).send('Error fetching user');
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, mission_call, home_address, home_city, home_state, home_country, home_zip } = req.body;
        await knex('users').where('user_id', id).update({
            first_name,
            last_name,
            mission_call,
            home_address,
            home_city,
            home_state,
            home_country,
            home_zip,
        });
        res.redirect('/users');
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Check if the ID is a valid number
      if (isNaN(id)) {
          console.error('Invalid user ID:', id);
          return res.status(400).send('Invalid user ID');
      }

      // Attempt to delete the user from the database
      const rowsDeleted = await knex('users').where('user_id', id).del();

      // Check if the user existed and was deleted
      if (rowsDeleted === 0) {
          console.error(`No user found with ID: ${id}`);
          return res.status(404).send('User not found');
      }

      console.log(`User with ID ${id} deleted successfully`);
      res.redirect('/users');
  } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
  }
});

module.exports = router;
