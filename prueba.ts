import * as fs from 'fs';

// Define una interfaz para el formato del objeto dentro del JSON
interface Inmueble {
    "Código Catastral": string;
    "Dirección": string;
    // Agrega otras propiedades si es necesario
}

// Lee el archivo JSON
fs.readFile('inmueblesReorganizados_limpio.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    try {
        // Parsea el JSON a un array de objetos de TypeScript
        const jsonArray: Inmueble[] = JSON.parse(data);
        
        // Itera sobre cada objeto del array
        jsonArray.forEach((item, index) => {
            // Accede a la propiedad 'Dirección' y la imprime en consola
            console.log(`Dirección ${index + 1}: ${item.Dirección}`);
        });
    } catch (error) {
        console.error('Error al parsear el JSON:', error);
    }
});
