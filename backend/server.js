// --- Core
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Routes (tes fichiers)
import authRoutes from './src/routes/auth.js';
import cakeRoutes from './src/routes/cakes.js';
import orderRoutes from './src/routes/orders.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- App & Socket
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // autorise tout (simple pour le déploiement)
    credentials: true
  }
});

// --- Middlewares
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Dossier des fichiers uploadés (si tu en mets plus tard)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API
app.use('/api/auth', authRoutes);
app.use('/api/cakes', cakeRoutes);
app.use('/api/orders', orderRoutes);

// --- FRONTEND statique (sert index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// --- Démarrage
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur le port ${PORT}`);
});
