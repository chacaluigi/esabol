import pg from 'pg';

export const pool = new pg.Pool({
  user: 'luigi',
  host: 'localhost',
  password: '5477',
  database: 'esabol',
  port: '5432',
});

pool.query('SELECT NOW()').then((res) => {
  console.log(res);
});
