# PROYECTO ABP

Aplicación web interactiva que actúa como un explorador de productos, permitiendo no solo visualizar, filtrar y buscar productos, sino también obtener estadísticas y patrones a partir de sus datos.

## Instrucciones para ejecutar el proyecto

1. Clonar el repositorio con el comando:  
   git clone https://github.com/terrenoa/ABP_proyecto_integrador.git

2. Instalar las dependencias:  
   npm install

3. Ejecutar el proyecto:  
   npm run dev

## Tecnologías utilizadas

- React: Para construir la interfaz de usuario de forma dinámica.
- Tailwind CSS: Para aplicar estilos modernos y responsivos.
- Axios: Para consumir la API de productos desde DummyJSON.
- Recharts: Para representar visualizaciones gráficas.
- XLSX (SheetJS): Para exportar datos en formato Excel.

## Funcionalidades implementadas

- Búsqueda por nombre de producto.
- Filtro por categoría.
- Ordenamiento por precio y rating (ascendente y descendente).
- Estadísticas básicas (precio promedio, rating, productos con descuento, etc.).
- Visualizaciones:
  - Gráfico de barras: cantidad de productos por categoría.
  - Gráfico de líneas: evolución simulada de precios.
  - Pie chart: proporción de productos según stock.
- Exportación de productos filtrados a JSON, CSV y Excel.
- Modo oscuro y claro.
- Componentes reutilizables y lógica separada por responsabilidad.

## Conflicto: paginación y filtro por categoría desde la URL de la API

Al comienzo del desarrollo, se optó por un enfoque que utilizaba los parámetros limit y skip directamente en la URL de la API para implementar paginación, combinándolo con el filtro por categoría también en la URL. Esto permitía que la API devolviera únicamente los productos de la categoría seleccionada, paginados según el valor de skip.

Sin embargo, este enfoque resultó problemático cuando se quiso combinar con la lógica de búsqueda y ordenamiento en el frontend. Como la API solo devuelve un subconjunto limitado de productos (por ejemplo, los productos 21 al 30), es posible que ninguno de ellos coincida con la búsqueda del usuario, haciendo que la página aparezca vacía aunque sí existan coincidencias en otras páginas.

Por ejemplo:
https://dummyjson.com/products/category/smartphones?limit=10&skip=20

Devuelve la tercera página de la categoría smartphones, pero si se busca un nombre específico que no esté en ese subconjunto, no se mostrará nada.

## Decisión tomada

Para evitar este problema, se cambió de enfoque y se implementó una lógica en la cual se cargan todos los productos (con un limit amplio) una sola vez y luego se aplican todos los filtros (búsqueda, categoría y orden) directamente en el frontend.

Esta estrategia garantiza que siempre se tenga disponible el conjunto completo de productos sobre el cual aplicar los criterios del usuario y calcular estadísticas, sin depender de la estructura de la API ni limitar el análisis a una sola página de resultados.

## versión con paginación y filtro en la URL

Se deja en el repo un archivo txt donde se expone la logica inicial.

