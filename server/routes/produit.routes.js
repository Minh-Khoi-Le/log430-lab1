const express = require('express');
const router = express.Router();
const ProduitDAO = require('../dao/produit.dao');

//GET pour récupérer tous les produits
router.get('/', async (req, res) => {
    try {
        const produits = await ProduitDAO.findAll();
        res.json(produits);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
});


//POST pour ajouter un produit
router.post('/', async (req, res) => {
    const { nom, stock, prix, categorie } = req.body;

    try {
        const produit = await ProduitDAO.create({ nom, stock, prix, categorie });
        res.status(201).json(produit);
    } catch (error) {
        // Prisma error: code P2002 = unique constraint failed
        if (error.code === "P2002" && error.meta?.target?.includes("nom")) {
            return res.status(400).json({ error: "Le nom du produit doit être unique." });
        }
        res.status(500).json({ error: 'Erreur lors de la création du produit' });
    }
});

//PUT pour modifier un produit
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, stock, prix, categorie } = req.body;

    try {
        const produit = await ProduitDAO.update(parseInt(id, 10), { nom, stock, prix, categorie });
        res.json(produit);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
    }
});

//DELETE pour supprimer un produit
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const produit = await ProduitDAO.delete(parseInt(id, 10));
        res.json(produit);
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
    }
});

module.exports = router;
