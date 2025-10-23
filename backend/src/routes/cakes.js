import express from 'express';
const router = express.Router();

// Liste de gâteaux (en mémoire pour commencer)
let cakes = [
  {
    id: 1,
    name: 'Gâteau basque',
    price: 24,
    imageUrl: '/uploads/gateau-basque.jpg',
    active: true
  },
  {
    id: 2,
    name: 'Clafoutis aux poires',
    price: 19,
    imageUrl: '/uploads/clafoutis-poires.jpg',
    active: true
  }
];

// 🔹 Voir tous les gâteaux
router.get('/', (req, res) => {
  res.json(cakes.filter(c => c.active));
});

// 🔹 Voir un gâteau précis
router.get('/:id', (req, res) => {
  const cake = cakes.find(c => c.id === parseInt(req.params.id));
  if (!cake) return res.status(404).json({ message: 'Gâteau introuvable' });
  res.json(cake);
});

// 🔹 Ajouter un gâteau (chef)
router.post('/', (req, res) => {
  const { name, price, imageUrl } = req.body;
  if (!name || !price || !imageUrl)
    return res.status(400).json({ message: 'Champs manquants' });

  const newCake = {
    id: cakes.length + 1,
    name,
    price: parseFloat(price),
    imageUrl,
    active: true
  };
  cakes.push(newCake);
  res.status(201).json({ message: 'Gâteau ajouté', cake: newCake });
});

// 🔹 Modifier un gâteau (chef)
router.put('/:id', (req, res) => {
  const cake = cakes.find(c => c.id === parseInt(req.params.id));
  if (!cake) return res.status(404).json({ message: 'Gâteau introuvable' });

  const { name, price, imageUrl, active } = req.body;
  if (name) cake.name = name;
  if (price) cake.price = parseFloat(price);
  if (imageUrl) cake.imageUrl = imageUrl;
  if (active !== undefined) cake.active = active;

  res.json({ message: 'Gâteau mis à jour', cake });
});

// 🔹 Supprimer un gâteau (chef)
router.delete('/:id', (req, res) => {
  const index = cakes.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Gâteau introuvable' });

  cakes.splice(index, 1);
  res.json({ message: 'Gâteau supprimé' });
});

export default router;
