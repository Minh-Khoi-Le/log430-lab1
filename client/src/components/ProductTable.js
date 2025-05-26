import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

export default function ProductTable({ produits }) {
  return (
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
  );
}
