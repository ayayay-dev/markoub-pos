import { db, initDB } from "./db";
import { users } from "./db/schema";

async function main() {
  await initDB(); // Wait for DB initialization

  try {
    const allUsers = await db.select().from(users);
    console.log("Users:", allUsers);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Only run main() after we're sure DB is initialized
main().catch(console.error);
