import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import MenuCaisse from './components/MenuCaisse';
import { useLocation } from 'react-router-dom';



function App() {

  //Caisse courante
  const [caisseCourante, setCaisseCourante] = useState(null);

  //Produits et Formulaire
  const [produits, setProduits] = useState([]);
  const [form, setForm] = useState({ nom: '', stock: '', prix: '', categorie: '' });
  const [showForm, setShowForm] = useState(false); 
  const [editingId, setEditingId] = useState(null); 
  const [editForm, setEditForm] = useState({ nom: '', stock: '', prix: '', categorie: '' });
  const location = useLocation(); 

  //Charger la caisse courant du localStorage
  useEffect(() => {
    const caisseLS = localStorage.getItem('caisseCourante');
    if (caisseLS) {
      setCaisseCourante(JSON.parse(caisseLS));
    } else {
      const id = localStorage.getItem('idCaisse');
      if (id) {
        fetch(`http://localhost:3800/caisses/${id}`)
          .then(res => {
            if (!res.ok) throw new Error("Caisse non trouvée");
            return res.json();
          })
          .then(caisse => setCaisseCourante(caisse))
          .catch(err => {
            localStorage.removeItem('idCaisse');
            localStorage.removeItem('caisseCourante');
            setCaisseCourante(null);
            alert("La caisse sélectionnée n'existe plus.");
          });
      }
    }
  }, [location]); 

  
  //Charger les produits au chargement du composant
  useEffect(() => {
   if(caisseCourante) {
    fetchProduits();
   }
  }, [caisseCourante]);


  //Selection de la caisse
  const handleSelectCaisse = (caisse) => {
    setCaisseCourante(caisse); // On garde tout l’objet caisse, y compris employe
    localStorage.setItem('idCaisse', caisse.id);
    localStorage.setItem('caisseCourante', JSON.stringify(caisse));
  };



  //Redirection vers la gestion du magasin
  const handleGestionMagasin = () => {
    window.location.href = '/magasin';
  };


  //CRUD Produits
  const axiosConfig = caisseCourante ? { headers: { 'x-caisse-id': caisseCourante.id } } : {};

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
    if (!validateFields(form)) return;
    axios.post('http://localhost:3800/produits', {
      ...form,
      stock: parseInt(form.stock, 10),
      prix: parseFloat(form.prix)
    }, axiosConfig)
      .then(() => {
        setForm({ nom: '', stock: '', prix: '', categorie: '' });
        fetchProduits();
        setShowForm(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.error);
        } else {
          console.error('Erreur lors de l\'ajout du produit:', error);
          alert('Erreur lors de l\'ajout du produit');
        }
      });
  };

  const handleCancel = () => {
    setForm({ nom: '', stock: '', prix: '', categorie: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      axios.delete(`http://localhost:3800/produits/${id}`, axiosConfig)
        .then(() => fetchProduits());
    }
  };

  const handleEdit = (produit) => {
    setEditingId(produit.id);
    setEditForm({ nom: produit.nom, stock: produit.stock, prix: produit.prix, categorie: produit.categorie || '' });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleEditSave = (id) => {
    if (!validateFields(editForm)) return;
    axios.put(`http://localhost:3800/produits/${id}`, {
      ...editForm,
      stock: parseInt(editForm.stock, 10),
      prix: parseFloat(editForm.prix)
    }, axiosConfig)
      .then(() => {
        setEditingId(null);
        fetchProduits();
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.error);
        } else {
          console.error('Erreur lors de la modification du produit:', error);
          alert('Erreur lors de la modification du produit');
        }
      });
  };

  //Valdiation des champs
  const validateFields = (fields) => {
    if (!fields.nom || fields.stock === "" || fields.prix === "") {
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
      {/* Menu caisse */}
      <MenuCaisse
        caisseCourante={caisseCourante}
        onSelectCaisse={handleSelectCaisse}
        onGestionMagasin={handleGestionMagasin}
      />

      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Produits
      </Typography>
      
      {!showForm && (
        <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
          Ajouter un produit
        </Button>
      )}
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