import json

# Abrir el archivo JSON y cargar los datos con codificación utf-8
with open('documento.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Crear una nueva lista para almacenar los datos transformados
nuevo_data = []

# Iterar sobre cada elemento del JSON original
for elemento in data:
    # Extraer el diccionario "inmueble" de cada elemento
    inmueble = elemento.get('inmueble', {})  # Obtener el diccionario "inmueble" o un diccionario vacío si no existe

    # Agregar el diccionario "inmueble" a la nueva lista
    nuevo_data.append(inmueble)

# Escribir los datos transformados en un nuevo archivo JSON con codificación utf-8
with open('datos_transformados.json', 'w', encoding='utf-8') as file:
    json.dump(nuevo_data, file, ensure_ascii=False, indent=4)

print("JSON transformado con éxito.")
