import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

let db: ReturnType<typeof drizzle>;

const initDB = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "your_user",
    password: "your_password",
    database: "your_database",
  });

  db = drizzle(connection);
  return db;
};

export { db, initDB };
