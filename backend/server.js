// --- Import des modules principaux
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Import des routes
import authRoutes from './src/routes/auth.js';
import cakeRoutes from './src/routes/cakes.js';
import orderRoutes from './src/routes/orders.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Initialisation de l'application
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // autoriser tout pour simplifier le déploiement
    credentials: true
  }
});

// --- Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// --- Routes API
app.use('/api/auth', authRoutes);
app.use('/api/cakes', cakeRoutes);
app.use('/api/orders', orderRoutes);

// --- Servir le site frontend (dans backend/frontend)
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// --- Gestion des sockets (facultatif, si tu ajoutes du chat plus tard)
io.on('connection', (socket) => {
  console.log('🟢 Un utilisateur est connecté');
  socket.on('disconnect', () => {
    console.log('🔴 Un utilisateur s’est déconnecté');
  });
});

// --- Lancer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur le port ${PORT}`);
});
