// server/index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Routes pour les produits

// GET pour les produits
app.get('/produits', async (req, res) => {
  try {
    const produits = await prisma.produit.findMany();
    res.json(produits);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// POST pour ajouter un produit
app.post('/produits', async (req, res) => {
  const { nom, stock, prix, categorie } = req.body;
  try {
    const produit = await prisma.produit.create({
      data: { nom, stock, prix, categorie }
    });
    res.status(201).json(produit);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
});


const PORT = 3800;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
