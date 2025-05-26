import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function ProductForm({ form, handleChange, handleSubmit, onCancel }) {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', maxWidth: 700 }}>
      <TextField
        label="Nom"
        name="nom"
        value={form.nom}
        onChange={handleChange}
        required
      />
      <TextField
        label="Stock"
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        required
     
      />
      <TextField
        label="Prix"
        name="prix"
        type="number"
        value={form.prix}
        onChange={handleChange}
        required
      />
      <TextField
        label="Catégorie"
        name="categorie"
        type='text'
        value={form.categorie}
        onChange={handleChange}
        placeholder="Fruit, Légume, etc."
      />
      <Button variant="contained" type="submit" color="primary">
        Ajouter
      </Button>
      <Button variant="outlined" color="secondary" onClick={onCancel}>
         Annuler
      </Button>
    </Box>
  );
}

ProductForm.propTypes = {
  form: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    prix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    categorie: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};
