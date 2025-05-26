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
    // Prisma error: code P2002 = unique constraint failed
    if (error.code === "P2002" && error.meta?.target?.includes("nom")) {
      return res.status(400).json({ error: "Le nom du produit doit être unique." });
    }
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
});

// DELETE pour supprimer un produit
app.delete('/produits/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const produit = await prisma.produit.delete({
      where: { id: parseInt(id, 10) }
    });
    res.json(produit);
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
  }
});


// UPDATE pour modifier un produit
app.put('/produits/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, stock, prix, categorie } = req.body;
    console.log("PUT reçu pour id=", id, "body=", req.body);

  try {
    const produit = await prisma.produit.update({
      where: { id: parseInt(id, 10) },
      data: { nom, stock, prix, categorie }
    });
    res.json(produit);
  } catch (error) {
    if (error.code === "P2025") {
      // P2025 = Record to update not found.
      return res.status(404).json({ error: "Produit introuvable !" });
    }
    if (error.code === "P2002" && error.meta?.target?.includes("nom")) {
      return res.status(400).json({ error: "Le nom du produit doit être unique." });
    }
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
});



const PORT = 3800;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
