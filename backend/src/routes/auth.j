import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Vérifie si un utilisateur est connecté
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Non autorisé" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token invalide" });
  }
}

// Vérifie si l'utilisateur connecté est le chef
export function requireChef(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Non autorisé" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== "jochef28" || decoded.role !== "chef") {
      return res.status(403).json({ message: "Accès réservé au chef." });
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token invalide" });
  }
}
