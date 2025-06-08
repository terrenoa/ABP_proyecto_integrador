import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line,
  PieChart, Pie, Cell, Legend
} from 'recharts';


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
      <p>Precio promedio en la seleccion: ${props.avgPriceCategoria}</p>
      
    </div>
  ); 

}

function Graficos(props){
  return (
    <div>
      <p>Cantidad de productos por categoría</p>
      <BarChart width={600} height={250} data={props.dataCategorias}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="categoria" 
          angle={-45} 
          textAnchor="end" 
          interval={0} 
          height={80}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cantidad" fill="#8884d8" />

      </BarChart>

      <p>Evolución simulada de precios</p>
      <LineChart width={600} height={250} data={props.dataLineas} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="precio" stroke="#82ca9d" />
      </LineChart>

      <p>Proporción de productos según stock</p>
      <PieChart width={400} height={300}>
        <Pie
          data={props.dataStock}
          dataKey="valor"
          nameKey="nombre"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {props.dataStock.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'][index % 5]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

    </div>
  )



}

export { StatsPanel, Graficos };