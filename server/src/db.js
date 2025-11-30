import mysql from 'mysql2/promise';

const host =
  process.env.DB_HOST ||
  process.env.MYSQLHOST || // Railway
  'db';                   

const port = Number(
  process.env.DB_PORT ||
  process.env.MYSQLPORT || // Railway
  3306
);

const user =
  process.env.DB_USER ||
  process.env.MYSQLUSER || // Railway
  'fitnessuser';           // local docker user

const password =
  process.env.DB_PASSWORD ||
  process.env.MYSQLPASSWORD || // Railway
  'fitnesspass';               // local docker password

const database =
  process.env.DB_NAME ||
  process.env.MYSQLDATABASE ||   
  process.env.MYSQL_DATABASE ||  
  'fitnessapp';                  

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;