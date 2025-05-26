const express = require('express');
const router = express.Router();
const caisseDAO = require('../dao/caisse.dao');

// GET pour récupérer toutes les caisses
router.get('/', async (req, res) => {
    try {
        const caisses = await caisseDAO.findAll();
        res.json(caisses);
    } catch (error) {
        console.error('Erreur lors de la récupération des caisses:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des caisses' });
    }
});

// Ouvir une caisse
router.post('/', async (req, res) => {
    const { magasinId, nom, employeId } = req.body;

    try {
        if (!magasinId || !nom || !employeId) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const caisse = await caisseDAO.create(magasinId, nom, employeId);
        res.status(201).json(caisse);
    } catch (error) {
        console.error('Erreur lors de l\'ouverture de la caisse:', error);
        res.status(500).json({ error: 'Erreur lors de l\'ouverture de la caisse' });
    }
});


// Fermer une caisse
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log('Fermeture de la caisse avec ID:', id);
        const caisse = await caisseDAO.close(parseInt(id, 10));
        res.status(200).json(caisse);
    } catch (error) {
        console.error('Erreur lors de la fermeture de la caisse:', error);
        res.status(500).json({ error: 'Erreur lors de la fermeture de la caisse' });
    }
});

module.exports = router;