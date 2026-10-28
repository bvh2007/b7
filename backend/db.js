const mysql=require('mysql2/promise');
const ssl=process.env.DB_SSL==='true'?{rejectUnauthorized:true}:undefined;
const options=process.env.DATABASE_URL?{uri:process.env.DATABASE_URL}:{host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME};
if(!process.env.DATABASE_URL&&(!process.env.DB_USER||!process.env.DB_NAME))throw new Error('Configure DATABASE_URL or DB_USER + DB_NAME in .env / Render Environment');
module.exports=mysql.createPool({...options,waitForConnections:true,connectionLimit:8,ssl});
