import mysql from 'mysql2/promise';

const dbConfig = {
  host: "srv747.hstgr.io",
  port: "3306",
  user: "u212050690_Jaivial",
  password: "Jva_Mvc_5171",
  database: "u212050690_Astrodatabase",
};

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const db = await mysql.createConnection(dbConfig);
      const query = 'SELECT id, direccion, tipo, uso, superficie, ano_construccion FROM inmuebles';
      const [casas] = await db.execute(query);
      await db.end();
      res.status(200).json(casas);
    } catch (error) {
      console.error('Error fetching casas:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (method === 'DELETE') {
    const { id } = req.query;
    try {
      const db = await mysql.createConnection(dbConfig);
      await db.execute(`DELETE FROM inmuebles WHERE id = ?`, [id]);
      await db.end();
      res.status(200).json({ message: 'Inmueble deleted successfully' });
    } catch (error) {
      console.error('Error deleting inmueble:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (method === 'POST') {
    const { id, comment } = req.body;
    try {
      const db = await mysql.createConnection(dbConfig);
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      await db.execute(`INSERT INTO comentarios (id, texto, fecha) VALUES (?, ?, ?)`, [id, comment, currentDate]);
      await db.end();
      res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error inserting comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
