const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Authentication Configuration ---
// WARNING: For production, use environment variables and hashed passwords.
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'password123'; // Change this!
const AUTH_TOKEN = 'secret-auth-token-for-invomex-admin'; // A long, random, secret string

app.use(cors());
app.use(express.json());

// Serve static files (the existing HTML/CSS)
app.use(express.static(path.join(__dirname)));

// SQLite setup (file: data.db)
const db = new Database(path.join(__dirname, 'data.db'));

// Initialize table
db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    empresa TEXT,
    telefono TEXT,
    servicio TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Insert statement
const insertStmt = db.prepare('INSERT INTO contacts (name, email, empresa, telefono, servicio, message) VALUES (?, ?, ?, ?, ?, ?)');
const selectAllStmt = db.prepare('SELECT id, name, email, empresa, telefono, servicio, message, created_at FROM contacts ORDER BY created_at DESC');

// Basic in-memory rate limiter (per-IP)
const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequestsPerWindow = 30;
const ipRequests = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = ipRequests.get(ip) || { count: 0, start: now };
  if (now - entry.start > rateLimitWindowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  ipRequests.set(ip, entry);
  if (entry.count > maxRequestsPerWindow) {
    return res.status(429).json({ error: 'Demasiadas solicitudes desde su IP. Intente nuevamente más tarde.' });
  }
  next();
}

// Simple validation helpers
function isValidEmail(email) {
  if (!email) return false;
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function sanitizeAndValidatePayload(payload) {
  const out = {};
  out.name = (payload.name || '').toString().trim().slice(0, 200);
  out.email = (payload.email || '').toString().trim().slice(0, 200);
  out.empresa = (payload.empresa || '').toString().trim().slice(0, 200) || null;
  out.telefono = (payload.telefono || '').toString().trim().slice(0, 50) || null;
  out.servicio = (payload.servicio || '').toString().trim().slice(0, 100) || null;
  out.message = (payload.message || '').toString().trim().slice(0, 2000) || null;

  const errors = [];
  if (!out.name) errors.push('El campo "name" es obligatorio.');
  if (!out.email) errors.push('El campo "email" es obligatorio.');
  else if (!isValidEmail(out.email)) errors.push('El campo "email" no tiene un formato válido.');

  return { out, errors };
}

// --- API Routes ---

// API: Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        res.json({ success: true, token: AUTH_TOKEN });
    } else {
        res.status(401).json({ success: false, error: 'Credenciales incorrectas.' });
    }
});

// Auth Middleware
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (token === AUTH_TOKEN) {
        next();
    } else {
        res.status(403).json({ error: 'Acceso no autorizado.' });
    }
}

// API: submit contact (Public)
app.post('/api/contacts', rateLimiter, (req, res) => {
  const { out, errors } = sanitizeAndValidatePayload(req.body || {});
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  try {
    const info = insertStmt.run(out.name, out.email, out.empresa, out.telefono, out.servicio, out.message);
    const created = db.prepare('SELECT id, name, email, empresa, telefono, servicio, message, created_at FROM contacts WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json({ success: true, contact: created });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Error al guardar en la base de datos.' });
  }
});

// API: list contacts (Protected)
app.get('/api/contacts', authMiddleware, (req, res) => {
  try {
    const rows = selectAllStmt.all();
    res.json({ contacts: rows });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Error al leer la base de datos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
