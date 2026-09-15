import connectDB, { InsertIntoUserTable, PrintAllUsers } from "./db.js"

const db = connectDB();

async function main() {
    await InsertIntoUserTable(
        "Sarang', 'hacked@example.com'); DROP TABLE users; --",
        "test@example.com"
    );
    await PrintAllUsers();
}

main();