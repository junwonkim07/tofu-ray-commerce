import sqlite3 from 'sqlite3'
import path from 'path'

const dbPath = path.join(__dirname, '..', '..', '..', 'data', 'tofu-ray.db')
export const db = new sqlite3.Database(dbPath)

export function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT,
        lastName TEXT,
        createdAt TEXT,
        updatedAt TEXT
      )
    `)

    // Orders table
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        orderNumber TEXT UNIQUE NOT NULL,
        items TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        currency TEXT,
        status TEXT DEFAULT 'pending',
        email TEXT,
        firstName TEXT,
        lastName TEXT,
        phone TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        postalCode TEXT,
        country TEXT,
        createdAt TEXT,
        updatedAt TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
      )
    `)

    // Inquiries table
    db.run(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        orderId TEXT,
        subject TEXT NOT NULL,
        status TEXT DEFAULT 'open',
        createdAt TEXT,
        updatedAt TEXT,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(orderId) REFERENCES orders(id)
      )
    `)

    // Inquiry messages table
    db.run(`
      CREATE TABLE IF NOT EXISTS inquiry_messages (
        id TEXT PRIMARY KEY,
        inquiryId TEXT NOT NULL,
        sender TEXT NOT NULL,
        messageType TEXT DEFAULT 'text',
        content TEXT,
        createdAt TEXT,
        FOREIGN KEY(inquiryId) REFERENCES inquiries(id)
      )
    `)

    // Notices table
    db.run(`
      CREATE TABLE IF NOT EXISTS notices (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT,
        createdAt TEXT,
        updatedAt TEXT
      )
    `)

    // Notice comments table
    db.run(`
      CREATE TABLE IF NOT EXISTS notice_comments (
        id TEXT PRIMARY KEY,
        noticeId TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT,
        FOREIGN KEY(noticeId) REFERENCES notices(id)
      )
    `)

    console.log('✅ Database initialized successfully')
  })
}
