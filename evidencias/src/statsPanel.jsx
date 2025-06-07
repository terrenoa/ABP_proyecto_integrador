export function StatsPanel({
  totalProducts,
  maxProduct,
  minProduct,
  discProduct,
  tituloVeinte,
  avgRating
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Estadísticas</h2>
      <p>Se muestran {totalProducts} productos</p>
      <p>Precio mas alto: ${maxProduct}</p>
      <p>Mejor precio: ${minProduct}</p>
      <p>Precio descuento: ${discProduct}</p>
      <p>Productos con título mayor a 20 caracteres: {tituloVeinte}</p>
      <p>Promedio de puntaje: {avgRating}★</p>
    </div>
  );
}