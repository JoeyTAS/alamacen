const { Pool } = require('pg');

class Database {
  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'inventario',
      password: 'admin',
      port: 5432,
    });
  }

  async query(text, params) {
    try {
      const res = await this.pool.query(text, params);
      return res;
    } catch (error) {
      console.error('Error executing query', error.stack);
      console.error('Error details:', error);
      throw new Error('Database query failed');
    }
  }
  

  async checkConnection() {
    try {
      await this.pool.query('SELECT NOW()');  // Verificar conexión
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Failed to connect to database', error);
    }
  }

  close() {
    this.pool.end().then(() => {
      console.log('Connection pool closed');
    }).catch(err => {
      console.error('Error closing the connection pool', err);
    });
  }
}

module.exports = new Database();
