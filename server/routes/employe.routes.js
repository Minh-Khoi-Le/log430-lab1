const express = require('express');
const router = express.Router();
const employeDAO = require('../dao/employe.dao');

// GET pour récupérer tous les employés
router.get('/', async (req, res) => {
    try {
        const employes = await employeDAO.findAll();
        res.json(employes);
    } catch (error) {
        console.error('Erreur lors de la récupération des employés:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des employés' });
    }
});


// POST pour créer un nouvel employé
router.post('/', async (req, res) => {
    const { nom } = req.body;
    
    try {
        if (!nom) return res.status(400).json({ error: "Nom requis" });
        const employe = await employeDAO.create(nom);
        res.status(201).json(employe);
    } catch (error) {
        console.error('Erreur lors de la création de l\'employé:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'employé' });
    }
});

module.exports = router;