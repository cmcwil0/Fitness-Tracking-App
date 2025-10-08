import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'fitnessuser',
  password: process.env.DB_PASSWORD || 'fitnesspass',
  database: process.env.DB_NAME || 'fitnessapp',
  connectionLimit: 10
});

export default pool;