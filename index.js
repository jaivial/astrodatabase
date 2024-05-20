const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'srv747.hstgr.io',
  port: '3306',
  user: 'u212050690_Jaivial',
  password: 'Jva_Mvc_5171',
  database: 'u212050690_Astrodatabase',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/search', (req, res) => {
  const { texto } = req.body;
  const query = `
    SELECT id, direccion, uso, ano_construccion, superficie 
    FROM inmuebles 
    WHERE direccion LIKE ?;
  `;
  db.query(query, [`%${texto}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
