# Evidencia 1
Fetch de datos de la api DummyJSON con axios y visualizacion en patalla haciendo uso de react y tailwindcss 

## Instrucciones para ejecutar el proyecto
1. clonar el repositorio con el comando git clone https://github.com/terrenoa/proyecto_integrador_ev1.got
2. instalar las dependencias con el comando npm install
3. ejecutar con el comando npm run dev

## Imagen
<img width="423" alt="ev1 pI" src="https://github.com/user-attachments/assets/24d8c253-a7f6-41d6-8cf9-0eef2a43f4cc" />

# Evidencia 2
Se implemetó una barra de busqueda dinamca que actualiza los productos que se muestran y las estadisticas segun lo que se haya filtrado.
Se separo el codigo en tres componentes:
1. app.jsx: contiene toda la logica escencial para el funcionamiento.
2. statspanel.jsx: recive las estadisticas definidas en app.jsx y las rederiza en pantalla.
3. productlist.jsx: recibe los archivos filtrados en la barra de busqueda y los renderiza en pantalla.

### Estadisticas
Se incluyeron las estadisticas:
1. Cantidad de productos mostrados: total de productos filtrados que coinciden con la búsqueda.
2. Precio más alto: precio del producto más caro en la lista filtrada.
3. Precio más bajo: precio del producto más barato en la lista filtrada.
4. Mayor descuento: porcentaje de descuento más alto entre los productos filtrados.
5. Productos con título largo: cantidad de productos cuyo título tiene más de 20 caracteres.
6. Promedio de puntaje: promedio de la puntuación (rating) de los productos filtrados, con dos decimales.

## Imagen
![image](https://github.com/user-attachments/assets/c797468e-3c57-460b-a0aa-8849a8bfcc0e)


