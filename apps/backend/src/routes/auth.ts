import express, { Router, Request, Response } from 'express'
import { db } from '../database'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

export const authRoutes: Router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Login
authRoutes.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  // For now, create or get user (no password check in demo)
  const userId = uuidv4()
  const now = new Date().toISOString()

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user: any) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' })
    }

    if (user) {
      // User exists, generate token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '24h',
      })
      return res.json({ token, userId: user.id, email: user.email })
    }

    // Create new user
    db.run(
      'INSERT INTO users (id, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
      [userId, email, password, now, now],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create user' })
        }

        const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '24h' })
        res.json({ token, userId, email })
      }
    )
  })
})

// Verify token
authRoutes.post('/verify', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    res.json({ valid: true, userId: decoded.userId, email: decoded.email })
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
})
