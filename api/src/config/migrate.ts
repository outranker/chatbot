import { migrate } from "drizzle-orm/mysql2/migrator";
import { singleConnection } from "./db.js";
// import { sql } from "drizzle-orm";

// This will run migrations on the database, skipping the ones already applied
(async () => {
  const { db, connection } = await singleConnection();

  await migrate(db, { migrationsFolder: "./drizzle" });

  const tables = ["admins", "refresh_tokens"];
  // for (const table of tables) {
  //   await db.execute(
  //     sql.raw(`
  //       CREATE TRIGGER update_timestamp
  //       BEFORE UPDATE ON ${table}
  //       FOR EACH ROW
  //       BEGIN
  //         SET NEW.updated_at = NOW();
  //       END;
  //   `),
  //   );
  // }

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
})();
