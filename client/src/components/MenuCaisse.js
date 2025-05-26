import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

export default function MenuCaisse({ caisseCourante, onSelectCaisse, onGestionMagasin }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [caisses, setCaisses] = useState([]);
  const navigate = useNavigate();

  // Fetch caisses chaque fois qu’on ouvre le menu (pour garder à jour)
  const refreshCaisses = () => {
    fetch('http://localhost:3800/caisses')
      .then(response => response.json())
      .then(data => setCaisses(data))
      .catch(() => setCaisses([])); 
  };

  useEffect(() => {
    if (anchorEl) refreshCaisses();
    // eslint-disable-next-line
  }, [anchorEl]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Afficher le nom de la caisse courante
  let caisseCouranteLabel = '';
  if (caisseCourante) {
    caisseCouranteLabel = caisseCourante.nom;
    if (caisseCourante.employe) {
      caisseCouranteLabel += ` (${caisseCourante.employe.nom})`;
    }
  }

return (
    <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 10, fontWeight: 'bold' }}>
        {caisseCouranteLabel}
      </span>

      <IconButton onClick={handleOpenMenu}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
        {caisses.length === 0 && (
          <MenuItem disabled>Aucune caisse ouverte</MenuItem>
        )}
        {caisses.map(caisse => (
          <MenuItem
            key={caisse.id}
            selected={caisseCourante && caisse.id === caisseCourante.id}
            onClick={() => { onSelectCaisse(caisse); handleCloseMenu(); }}>
            {caisse.nom} {caisse.employe ? `(${caisse.employe.nom})` : ''}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => { handleCloseMenu(); navigate("/magasin"); }}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText>Gestion magasin</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

MenuCaisse.propTypes = {
  caisseCourante: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nom: PropTypes.string,
    employe: PropTypes.shape({
      nom: PropTypes.string
    })
  }),
  onSelectCaisse: PropTypes.func.isRequired,
  onGestionMagasin: PropTypes.func.isRequired
};
