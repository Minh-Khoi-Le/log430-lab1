import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';

export default function ProductTable({
  produits, onDelete, onEdit,
  editingId, editForm, onEditChange, onEditCancel, onEditSave
}) {
  return (
    <TableContainer component={Paper} elevation={4} style={{ maxWidth: 700 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nom</b></TableCell>
            <TableCell><b>Stock</b></TableCell>
            <TableCell><b>Prix</b></TableCell>
            <TableCell><b>Catégorie</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produits.map((produit) => (
            <TableRow key={produit.id}>
              {editingId === produit.id ? (
                <>
                  <TableCell>
                    <TextField
                      name="nom"
                      value={editForm.nom}
                      onChange={onEditChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="stock"
                      type="number"
                      value={editForm.stock}
                      onChange={onEditChange}
                      size="small"
                     
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="prix"
                      type="number"
                      value={editForm.prix}
                      onChange={onEditChange}
                      size="small"
                     
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="categorie"
                      value={editForm.categorie}
                      onChange={onEditChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => onEditSave(produit.id)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={onEditCancel}>
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{produit.nom}</TableCell>
                  <TableCell>{produit.stock}</TableCell>
                  <TableCell>{produit.prix}</TableCell>
                  <TableCell>{produit.categorie}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => onDelete(produit.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => onEdit(produit)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
ProductTable.propTypes = {
  produits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
      prix: PropTypes.number.isRequired,
      categorie: PropTypes.string
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editingId: PropTypes.number,
  editForm: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    prix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    categorie: PropTypes.string
  }).isRequired,
  onEditChange: PropTypes.func.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  onEditSave: PropTypes.func.isRequired
};