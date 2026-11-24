import "server-only";

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

type NeonPool = InstanceType<typeof Pool>;

const globalForMorphFolio = globalThis as typeof globalThis & {
  morphfolioNeonPool?: NeonPool;
};

function getPool(): NeonPool {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!connectionString.startsWith("postgres://") && !connectionString.startsWith("postgresql://")) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection string.");
  }

  globalForMorphFolio.morphfolioNeonPool ??= new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000
  });

  return globalForMorphFolio.morphfolioNeonPool;
}

export function getDatabase() {
  return drizzle(getPool(), { schema });
}

export async function closeDatabasePool() {
  const pool = globalForMorphFolio.morphfolioNeonPool;

  if (pool) {
    globalForMorphFolio.morphfolioNeonPool = undefined;
    await pool.end();
  }
}

export type Database = ReturnType<typeof getDatabase>;
