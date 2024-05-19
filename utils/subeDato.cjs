const mysql = require('mysql2/promise');
const fs = require('fs');

(async () => {
  try {
    // Establecer conexión a la base de datos
    const connection = await mysql.createConnection({
      host: 'srv747.hstgr.io',
      port: '3306',
      user: 'u212050690_Jaivial',
      password: 'Jva_Mvc_5171',
      database: 'u212050690_Astrodatabase'
    });
    console.log("Conexión a la base de datos establecida con éxito.");

    // Crear tabla "inmuebles" si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inmuebles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        direccion VARCHAR(255),
        tipo VARCHAR(50),
        uso VARCHAR(50),
        superficie VARCHAR(50),
        ano_construccion INT
      )
    `);
    console.log("Tabla 'inmuebles' creada o verificada con éxito.");

    // Leer el archivo JSON
    const data = fs.readFileSync('datos_transformados.json', 'utf8');
    const inmueblesData = JSON.parse(data);
    console.log("Archivo JSON leído con éxito.");

    // Insertar datos en la tabla "inmuebles"
    for (const inmueble of inmueblesData) {
      const { "Código Catastral": codigoCatastral, Dirección, Uso, Superficie, "Año de Construcción": anoConstruccion } = inmueble;
      
      // Reemplazar valores undefined por null
      const direccion = Dirección || null;
      const tipo = "Urbano" || null; // No hay "tipo" en el nuevo formato del JSON
      const usoValue = Uso || null;
      const superficie = Superficie || null;
      const ano_construccion = anoConstruccion || null;

      await connection.execute(`
        INSERT INTO inmuebles (direccion, tipo, uso, superficie, ano_construccion)
        VALUES (?, ?, ?, ?, ?)
      `, [direccion, tipo, usoValue, superficie, ano_construccion]);
    }
    console.log("Datos insertados en la tabla 'inmuebles' con éxito.");

    // Cerrar la conexión
    await connection.end();
    console.log("Conexión a la base de datos cerrada.");
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
