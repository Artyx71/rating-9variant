/////////////////Create/////////////////////////

const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-db-user',
  host: 'your-db-host',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 'your-db-port',
});

async function createPatient(name, phone, complaints) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO patients (name, phone, complaints) VALUES ($1, $2, $3) RETURNING id';
    const values = [name, phone, complaints];
    const result = await client.query(queryText, values);
    await client.query('COMMIT');
    return result.rows[0].id;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}




/////////////////////Read/////////////////////////////////////
async function getPatient(id) {
    const client = await pool.connect();
    try {
      const queryText = 'SELECT * FROM patients WHERE id = $1';
      const values = [id];
      const result = await client.query(queryText, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }




///////////////////////Update//////////////////////////////////////////////
async function updatePatient(id, name, phone, complaints) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const queryText = 'UPDATE patients SET name = $2, phone = $3, complaints = $4 WHERE id = $1';
      const values = [id, name, phone, complaints];
      const result = await client.query(queryText, values);
      await client.query('COMMIT');
      return result.rowCount === 1;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
  


  ///////////////////////////////////Delete///////////////////////////////////////////
  async function deletePatient(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const queryText = 'DELETE FROM patients WHERE id = $1';
      const values = [id];
      const result = await client.query(queryText, values);
      await client.query('COMMIT');
      return result.rowCount === 1;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }