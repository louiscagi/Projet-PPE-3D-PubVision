const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Il n'est pas nécessaire d'utiliser bodyParser.json() pour cette route spécifique
// Servez vos fichiers statiques (HTML, CSS, JS) à partir de la racine de votre projet
app.use(express.static('.')); // '.' fait référence au répertoire courant, donc la racine de votre projet

// Créer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'images'
});

// Test de la connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Route API pour envoyer l'image en format base64
app.get('/api/images', (req, res) => {
  db.query('SELECT photo FROM image WHERE id = 1 LIMIT 1', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }
    if (results.length > 0) {
      // Assumer que 'photo' est un blob
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

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});
