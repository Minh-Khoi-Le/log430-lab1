import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';

function App() {
  const [produits, setProduits] = useState([]);
  const [form, setForm] = useState({ nom: '', stock: '', prix: '', categorie: '' });
  const [showForm, setShowForm] = useState(false); // <--- nouvel état

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = () => {
    axios.get('http://localhost:3800/produits')
      .then(response => setProduits(response.data))
      .catch(error => console.error('Erreur lors de la récupération des produits:', error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation basique pour s'assurer que les champs requis sont remplis
    if (!form.nom || !form.stock || !form.prix) return alert('Champs requis manquants!');

    //Validation pour s'assurer que stock et prix sont des nombres postifs

    axios.post('http://localhost:3800/produits', {
      ...form,
      stock: parseInt(form.stock, 10),
      prix: parseFloat(form.prix)
    })
      .then(() => {
        setForm({ nom: '', stock: '', prix: '', categorie: '' }); // Reset form
        fetchProduits(); // Rafraîchir la liste
        setShowForm(false); // Masquer le formulaire après ajout
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.error); // Afficher l'erreur de validation
        } else {
          console.error('Erreur lors de l\'ajout du produit:', error);
          alert('Erreur lors de l\'ajout du produit');
        }
      });
  };

  // Fonction pour annuler (cacher le formulaire)
  const handleCancel = () => {
    setForm({ nom: '', stock: '', prix: '', categorie: '' });
    setShowForm(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Produits
      </Typography>

      {/* Bouton pour afficher le formulaire */}
      {!showForm && (
        <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
          Ajouter un produit
        </Button>
      )}

      {/* Formulaire affiché seulement si showForm est true */}
      {showForm && (
        <ProductForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <ProductTable produits={produits} />
    </div>
  );
}

export default App;
