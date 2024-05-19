"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Lee el archivo JSON
fs.readFile('inmueblesReorganizados_limpio.json', 'utf8', function (err, data) {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    try {
        // Parsea el JSON a un array de objetos de TypeScript
        var jsonArray = JSON.parse(data);
        // Itera sobre cada objeto del array
        jsonArray.forEach(function (item, index) {
            // Accede a la propiedad 'Dirección' y la imprime en consola
            console.log("Direcci\u00F3n ".concat(index + 1, ": ").concat(item.Dirección));
        });
    }
    catch (error) {
        console.error('Error al parsear el JSON:', error);
    }
});
