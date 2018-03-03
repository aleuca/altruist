/**
 * Module dependencies
 */
const fs = require('fs');
const path = require('path');
const pg = require('pg');


 /**
 * Modules
 */

 const pool = pg.Pool ({
     user: 'the_altruist',
     password: 'password',
     database: 'altruist_database',
     host: 'altruist_db',
     port: 5432
 })

 /**
 * Module exports
 */

 module.exports = pool;