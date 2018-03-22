/**
 * module dependencies
 */
const fs = require('fs');
const path = require('path');
const db = require('./index');


 /**
  * modules
  */

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath).toString();

db.query(schema)
.then((dbResponse) => {
    console.log('sqldbResponse',dbResponse)
    process.exit(0);
})
.catch((err) => {
    console.log('Unexpected database error:', err)
    process.exit(1);
})
  /**
   * module exports
   */