import { db } from './connection';

const migrations = [
  `
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      sender TEXT NOT NULL CHECK(sender IN ('USER', 'AI')),
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    )
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id)
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at)
  `
];

export function runMigrations() {
  console.log('Running migrations...');
  
  migrations.forEach((migration, index) => {
    try {
      db.exec(migration);
      console.log(`Migration ${index + 1} completed`);
    } catch (error) {
      console.error(`Migration ${index + 1} failed:`, error);
      throw error;
    }
  });
  
  console.log('All migrations completed successfully');
}

if (require.main === module) {
  runMigrations();
  db.close();
}