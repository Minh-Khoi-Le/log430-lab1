import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, Dialog, TextField, MenuItem
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

export default function GestionMagasin() {
  const [caisses, setCaisses] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCaisse, setNewCaisse] = useState({ nom: '', employeId: '' });
  const navigate = useNavigate();

  // Récupérer caisses et employés
  const refreshData = () => {
    fetch('http://localhost:3800/caisses')
      .then(res => res.json())
      .then(setCaisses)
      .catch(() => setCaisses([]));
    fetch('http://localhost:3800/employes')
      .then(res => res.json())
      .then(setEmployes)
      .catch(() => setEmployes([]));
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Creer une caisse
  const handleCreate = () => {
    fetch('http://localhost:3800/caisses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        magasinId: 1,
        nom: newCaisse.nom,
        employeId: Number(newCaisse.employeId)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la création");
        return res.json();
      })
      .then(() => {
        setOpen(false);
        setNewCaisse({ nom: '', employeId: '' });
        refreshData();
      })
      .catch(e => alert(e.message));
  };
  
  // Fermer une caisse
  const handleFermer = (caisseId) => {
    if (window.confirm("Êtes-vous sûr de vouloir fermer cette caisse ?")){
      console.log("Fermeture de la caisse avec ID:", caisseId);
      fetch(`http://localhost:3800/caisses/${caisseId}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) throw new Error("Erreur lors de la fermeture");
          return res.json();
        })
        .then(() => {
          refreshData();
        })
        .catch(e => alert(e.message));
    }
  }

  // Rediriger vers la page de gestion des produits
  const handleCardClick = (caisse) => {
    // Stocke tout l'objet pour éviter l'incohérence
    localStorage.setItem('caisseCourante', JSON.stringify(caisse));
    localStorage.setItem('idCaisse', caisse.id); // pour compatibilité
    navigate('/produits');
  };


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 500, textShadow: '2px 2px 3px #e5e5e5' }}>
        GESTION MAGASIN
      </Typography>
      <Button variant="contained" sx={{ mb: 4 }} onClick={() => setOpen(true)}>
        Ouvrir une caisse
      </Button>

      {/* --- Cards grid --- */}
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4, 1fr)'
          }
        }}
      >
        {caisses.map(caisse => (
          <Paper key={caisse.id} elevation={3}
           sx={{
            p: 2, minHeight: 150, background: '#ddd',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            cursor: 'pointer', // pour feedback visuel
            transition: 'box-shadow 0.3s',
            '&:hover': { boxShadow: 8, background: '#eee' }
          }}
          onClick={() => handleCardClick(caisse)}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>{caisse.nom}</Typography>
            <PersonIcon sx={{ fontSize: 40 }} />
            <Typography variant="subtitle1">
              {caisse.employe?.nom || <span style={{ color: '#888' }}>Aucun</span>}
            </Typography>
            <Button 
              variant="outlined"
              color="error"
              size="small"
              sx={{ mt: 2 }}
              onClick={(e) => {
                e.stopPropagation(); // Empêche la propagation du clic à la carte
                handleFermer(caisse.id);
              }}>
              Fermer la caisse
            </Button>
          </Paper>
        ))}
      </Box>

      {/* Dialog de création */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Ouvrir une caisse</Typography>
          <TextField
            label="Nom de la caisse"
            value={newCaisse.nom}
            onChange={e => setNewCaisse({ ...newCaisse, nom: e.target.value })}
            fullWidth margin="dense"
          />
          <TextField
            label="Employé"
            select
            value={newCaisse.employeId}
            onChange={e => setNewCaisse({ ...newCaisse, employeId: e.target.value })}
            fullWidth margin="dense"
          >
            {employes.map(emp => (
              <MenuItem key={emp.id} value={emp.id}>{emp.nom}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleCreate}
            disabled={!newCaisse.nom || !newCaisse.employeId}
          >Créer</Button>
        </Box>
      </Dialog>
    </Box>
  );
}
