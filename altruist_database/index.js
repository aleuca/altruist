/**
 * Module dependencies
 */
const fs = require('fs');
const path = require('path');
const pg = require('pg');


/**
 * Modules
 */

let pool;

console.log('db url:', process.env.DATABASE_URL)
console.log('env:', process.env)
if (process.env.DATABASE_URL) {
    pool = pg.Pool(process.env.DATABASE_URL);
} else {
    // local environment
    pool = pg.Pool({
        user: 'the_altruist',
        password: 'password',
        database: 'altruist_database',
        host: 'altruist_db',
        port: 5432
    })
}


/**
 * Module exports
 */

module.exports = pool;