import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
export const client = createClient({url:process.env.TURSO_DATABASE_URL || 'file:local.db', authToken:process.env.TURSO_AUTH_TOKEN || undefined});
export const db = drizzle(client, {schema});
let ready: Promise<void> | undefined;
export function init() { return ready ??= (async()=>{ for(const sql of [
`CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, type TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, amount REAL NOT NULL, type TEXT NOT NULL, category TEXT NOT NULL, date TEXT NOT NULL, description TEXT NOT NULL DEFAULT '')`,
`CREATE TABLE IF NOT EXISTS budgets (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, month TEXT NOT NULL, amount REAL NOT NULL, UNIQUE(category,month))`,
`CREATE TABLE IF NOT EXISTS savings_goals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, target REAL NOT NULL, date TEXT NOT NULL, icon TEXT NOT NULL DEFAULT '✨', color TEXT NOT NULL DEFAULT '#DCEBDD')`,
`CREATE TABLE IF NOT EXISTS savings_contributions (id INTEGER PRIMARY KEY AUTOINCREMENT, goal_id INTEGER NOT NULL REFERENCES savings_goals(id), amount REAL NOT NULL, date TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS ai_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, role TEXT NOT NULL, content TEXT NOT NULL, date TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`]) await client.execute(sql);
const count=await client.execute('SELECT count(*) as n FROM categories'); if(!Number(count.rows[0].n)){ for(const [type,names] of Object.entries({expense:['Продукты','Транспорт','Одежда','Здоровье','Образование','Красота','Развлечения','Дом','Другое'],income:['Зарплата','Фриланс','Подарки','Дополнительный доход','Другое']})) for(const name of names) await db.insert(schema.categories).values({name,type}); }
})(); }
