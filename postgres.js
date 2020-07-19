const Pool  = require('pg').Pool;

const pool = new Pool({
    host: 'teste-postgres-compose',
    user: 'postgres',
    password: '#senha',
    database: 'postgres',
    port: 5432
});

module.exports = {
    pool,
}