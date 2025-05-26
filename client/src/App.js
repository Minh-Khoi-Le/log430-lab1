import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';

function App() {
  const [produits, setProduits] = useState([]);
  const [form, setForm] = useState({ nom: '', stock: '', prix: '', categorie: '' });
  const [showForm, setShowForm] = useState(false); 
  const [editingId, setEditingId] = useState(null); 
  const [editForm, setEditForm] = useState({ nom: '', stock: '', prix: '', categorie: '' });


  useEffect(() => {
    fetchProduits();
  }, []);

  // Fonction pour récupérer la liste des produits
  const fetchProduits = () => {
    axios.get('http://localhost:3800/produits')
      .then(response => setProduits(response.data))
      .catch(error => console.error('Erreur lors de la récupération des produits:', error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs
    if (!validateFields(form)) return;

    // Envoi des données au serveur
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

  // Fonction pour supprimer un produit
  const handleDelete = (id) => {
  if (window.confirm("Supprimer ce produit ?")) {
    axios.delete(`http://localhost:3800/produits/${id}`)
      .then(() => fetchProduits());
  }
  };

  // Fonctions pour éditer un produit
  const handleEdit = (produit) => {
    setEditingId(produit.id);
    setEditForm({ nom: produit.nom, stock: produit.stock, prix: produit.prix, categorie: produit.categorie || '' })
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  const handleEditCancel = () => {
    setEditingId(null);
  }

  const handleEditSave = (id) => {
    // Validation des champs
    if (!validateFields(editForm)) return;

    // Envoi des données au serveur pour mettre à jour le produit
    axios.put(`http://localhost:3800/produits/${id}`, {
      ...editForm,
      stock: parseInt(editForm.stock, 10),
      prix: parseFloat(editForm.prix)
    })
      .then(() => {
        setEditingId(null);
        fetchProduits(); // Rafraîchir la liste
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.error); // Afficher l'erreur de validation
        } else {
          console.error('Erreur lors de la modification du produit:', error);
          alert('Erreur lors de la modification du produit');
        }
      })
  ;}


  //Validation du formulaire
  const validateFields = (fields) => {
  if (
    !fields.nom ||
    fields.stock === "" ||
    fields.prix === ""
  ) {
    alert('Champs requis manquants!');
    return false;
  }
  if (
    isNaN(fields.stock) ||
    isNaN(fields.prix) ||
    Number(fields.stock) < 0 ||
    Number(fields.prix) < 0
  ) {
    alert('Stock et prix doivent être des nombres positifs!');
    return false;
  }
  return true;

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

     <ProductTable
        produits={produits}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editingId={editingId}
        editForm={editForm}
        onEditChange={handleEditChange}
        onEditCancel={handleEditCancel}
        onEditSave={handleEditSave}
      />
    </div>
  );
}

export default App;
