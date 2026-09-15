import { Pool } from "pg"

const db = new Pool({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"postgres",
    database: "myapp",
});

export async function InsertIntoUserTable (name:string, email:string) {
    await db.query(`
        INSERT INTO users (name, email) VALUES ($1, $2);    
    `, [name, email]);
}

export async function PrintAllUsers () {
    const result = await db.query(`SELECT * FROM users;`)
    console.log(result.rows);
}

export default function connectDB(): Pool {
    Promise.all([
    db.query(`
       CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL
       );    
    `),
    db.query(`
       CREATE TABLE IF NOT EXISTS posts (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         like_count VARCHAR(255) UNIQUE NOT NULL
       );    
    `)
    ]).then(()=> console.log("Database Connnected"))
      .catch(err => { console.log("Database not connected", err)});
    return db as Pool;
}