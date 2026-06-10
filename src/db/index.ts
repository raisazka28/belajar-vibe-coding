import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required. Please check your .env file.');
}

const poolConnection = mysql.createPool(databaseUrl);

export const db = drizzle({ client: poolConnection, schema, mode: 'default' });
