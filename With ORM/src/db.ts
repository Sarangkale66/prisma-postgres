import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl || typeof dbUrl !== "string") {
  throw new Error(
    "Environment variable DATABASE_URL must be set to a valid PostgreSQL URL string."
  );
}

const adapter = new PrismaPg({
  connectionString: dbUrl,
});

const prisma = new PrismaClient({ adapter });

export default prisma;