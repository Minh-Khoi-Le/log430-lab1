import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

function App() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3800/produits')
      .then(response => setProduits(response.data))
      .catch(error => console.error('Erreur lors de la récupération des produits:', error));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Produits
      </Typography>
      <TableContainer component={Paper} elevation={4} style={{ maxWidth: 700 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nom</b></TableCell>
              <TableCell><b>Stock</b></TableCell>
              <TableCell><b>Prix</b></TableCell>
              <TableCell><b>Catégorie</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produits.map((produit) => (
              <TableRow key={produit.id}>
                <TableCell>{produit.nom}</TableCell>
                <TableCell>{produit.stock}</TableCell>
                <TableCell>{produit.prix}</TableCell>
                <TableCell>{produit.categorie}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
