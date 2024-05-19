import mysql from 'mysql2/promise'; // Use 'mysql2/promise' to work with async/await
import { readFile } from 'fs/promises';

const connection = await mysql.createConnection({
  host: 'srv747.hstgr.io', // Provide the IP address or domain name of your remote MySQL server
  port: '3306', // Provide the port number of your remote MySQL server (default is usually 3306)
  user: 'u212050690_Jaivial', // Provide the username to access your remote MySQL server
  password: 'Jva_Mvc_5171', // Provide the password to access your remote MySQL server
  database: 'u212050690_Astrodatabase' // Provide the name of the database you want to connect to
});

try {
    // Aquí puedes realizar consultas a la base de datos
    // Por ejemplo, crear una tabla
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS inmuebles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        direccion VARCHAR(255),
        tipo VARCHAR(50),
        uso VARCHAR(50),
        superficie VARCHAR(50),
        ano_construccion INT
      )
    `;

    await connection.execute(createTableQuery);
    console.log('Tabla "inmuebles" creada o verificada con éxito.');

    // Leer datos del archivo JSON
    const data = await readFile(new URL('./documento.json', import.meta.url), 'utf8');
    const inmueblesData = JSON.parse(data);

    for (const inmueble of inmueblesData) {
      const { Dirección, tipo, Uso, Superficie, "Año de Construcción": ano_construccion } = inmueble;
      
      // Ensure all values are defined or set to null if necessary
      const direccion = Dirección || null;
      const tipoValue = tipo || null;
      const uso = Uso || null;
      const superficie = Superficie || null;
      const anoConstruccion = ano_construccion || null;
      
      const insertQuery = `
        INSERT INTO inmuebles (direccion, tipo, uso, superficie, ano_construccion)
        VALUES (?, ?, ?, ?, ?)
      `;

      await connection.execute(insertQuery, [direccion, tipoValue, uso, superficie, anoConstruccion]);
      console.log('Datos insertados en la tabla "inmuebles" con éxito.');
    }
  } catch (err) {
    console.error('Error al realizar operaciones en la base de datos:', err.message);
  } finally {
    // Cerramos la conexión después de insertar los datos
    await connection.end();
    console.log('Conexión a MySQL cerrada.');
  }