import mysql from 'mysql2/promise';

export async function searchData(query, offset, limit) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'srv747.hstgr.io',
            port: '3306',
            user: 'u212050690_Jaivial',
            password: 'Jva_Mvc_5171',
            database: 'u212050690_Astrodatabase'
        });
        console.log("Conexión a la base de datos establecida con éxito.");

        // Usa el LIKE para la búsqueda basada en la dirección
        const searchQuery = `%${query}%`;
        const [rows] = await connection.execute(
            'SELECT id, direccion, tipo, uso, superficie, ano_construccion FROM inmuebles WHERE direccion LIKE ? LIMIT ?, ?',
            [searchQuery, offset, limit]
        );

        const [count] = await connection.execute(
            'SELECT COUNT(*) as count FROM inmuebles WHERE direccion LIKE ?',
            [searchQuery]
        );
        
        const totalRows = count[0].count;
        
        return { rows, totalRows };

    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error; // Re-throw the error after logging it
    } finally {
        if (connection) {
            await connection.end();
            console.log("Conexión a la base de datos cerrada.");
        }
    }
}
