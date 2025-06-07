function StatsPanel(props){
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Estadísticas</h2>
      <p>Se muestran {props.totalProducts} productos</p>
      <p>Precio mas alto en la seleccion: ${props.maxProduct}</p>
      <p>Mejor precio en la seleccion: ${props.minProduct}</p>
      <p>Mejor descuento en la seleccion: ${props.discProduct}</p>
      <p>Productos con título mayor a 20 caracteres en la seleccion: {props.tituloVeinte}</p>
      <p>Promedio de puntaje en la seleccion: {props.avgRating}★</p>
      <p>Productos con stock ≥ 50 en la seleccion: {props.stockMayor50}</p>
      <p>Productos con rating ≥ 4.5 en la seleccion: {props.ratingMayor45}</p>
    </div>
  ); 

}

export default StatsPanel