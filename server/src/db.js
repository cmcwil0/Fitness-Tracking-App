import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'fitnessuser',
  password: process.env.DB_PASSWORD || 'fitnesspass',
  database: process.env.DB_NAME || 'fitnessapp',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;