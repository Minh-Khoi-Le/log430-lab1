const express = require('express');
const cors = require('cors');
const produitRoutes = require('./routes/produit.routes');
const caisseRoutes = require('./routes/caisses.routes');
const employeRoutes = require('./routes/employe.routes');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/produits', produitRoutes);
app.use('/caisses', caisseRoutes); 
app.use('/employes', employeRoutes);

const PORT = 3800;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});