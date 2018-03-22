/**
 * Module dependencies
 */
const fs = require('fs');
const path = require('path');
const pg = require('pg');


/**
 * Modules
 */

let options;

if (process.env.DATABASE_URL) {
    options = {
        connectionString: process.env.DATABASE_URL
    }
} else {
    // local environment
    options = {
        user: 'the_altruist',
        password: 'password',
        database: 'altruist_database',
        host: 'altruist_db',
        port: 5432
    }
}

const pool = pg.Pool(options)

/**
 * Module exports
 */

module.exports = pool;