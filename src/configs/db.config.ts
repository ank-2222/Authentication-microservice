 
import { Pool } from 'pg';
 

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // Your PostgreSQL host
    database: 'rescueradar',
    password: 'root',
    port: 5432, // Your PostgreSQL port
  //   ssl: {
	// 	rejectUnauthorized: true,
	// },
  });


// const pool = new Pool({
//   connectionString: "postgres://default:wghjQmzZ93tU@ep-super-union-40832357.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb" + "?sslmode=require",
// })


  pool
  .connect()
  .then(() => {
    console.log('Database connection successful');
    // You can perform further database operations here
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
  });
  export default pool;