const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());


app.use(express.static('.')); // '.' racine projet

// bdd
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'images'
});


db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Route API pour envoyer l'image en format base64
app.get('/api/images', (req, res) => {
  db.query('SELECT photo FROM image ORDER BY id DESC LIMIT 1', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }
    if (results.length > 0) {
      const imageBlob = results[0].photo;
      // Convertir le Blob en chaîne de caractères base64
      const imageBase64 = Buffer.from(imageBlob).toString('base64');
      // Envoyer la chaîne en base64 en tant qu'objet JSON
      res.json({ imageData: `data:image/jpeg;base64,${imageBase64}` });
    } else {
      res.status(404).send('Aucune image trouvée');
    }
  });
});


app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});
