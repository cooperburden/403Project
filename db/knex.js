// db/knex.js
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres', // Replace with your database username
        password: '  43', // Remove any extra spaces in your password
        database: 'user_database', // Ensure the database name matches
        port: 5432, // Ensure this matches your PostgreSQL port
    },
});

module.exports = knexInstance;

// Test the database connection
knexInstance.raw('SELECT 1+1 AS result')
    .then(() => console.log('Database connected'))
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the app if the connection fails
    });
