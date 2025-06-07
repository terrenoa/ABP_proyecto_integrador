import './App.css';
import axios from "axios";
import { useEffect, useState, useRef } from 'react';
import StatsPanel from './StatsPanel';
import { ProductList } from "./ProductList";

function App() {

  /*ESTADOS*/

  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [show, setShow] = useState(true);
  const [theme, setTheme] = useState(false);
  /*const [page, setPage] = useState (1)*/ /* se usaba para la paginacio*/
  /*const [total, setTotal] = useState(0);*/ /* se usaba para la paginacio*/
  const [categorias, setCategorias] = useState([]);
  const [orden, setOrden] = useState("");

  /*REFERENCIAS*/

  const containerRef = useRef(null);
  const limite = 12

  /*DATOS*/

  useEffect(() => {
  axios.get(`https://dummyjson.com/products?limit=0`)
    .then((res) => {
      setProducts(res.data.products);
    });

  axios.get(`https://dummyjson.com/products/category-list`)
    .then((res) => {
      setCategorias(res.data); // <- esta línea estaba abierta
    });
    }, []);

  console.log(categorias)

  /* FILTROS*/
  /*categoria*/

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  /* nombre*/
  const filteredProducts = products
    .filter (p => p.title.toLowerCase().includes(busqueda.toLowerCase()))
    .filter (p => categoriaSeleccionada === "" || p.category === categoriaSeleccionada);
  
  /* orden*/

  const productosOrdenados = [...filteredProducts].sort((a, b) => {
    switch (orden) {
      case "precio-asc":
        return a.price - b.price;
      case "precio-desc":
        return b.price - a.price;
      case "rating-asc":
        return a.rating - b.rating;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });



  /* ESTADISITCAS*/

  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(...filteredProducts.map(p => p.price));
  const minProduct = Math.min(...filteredProducts.map(p => p.price));
  const discProduct = Math.max(...filteredProducts.map(p => p.discountPercentage));
  const tituloVeinte = filteredProducts.filter(p => p.title.length > 20).length;
  const avgRating = filteredProducts.length > 0
    ? (filteredProducts.reduce((acumulador, p) => acumulador + p.rating, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const stockMayor50 = filteredProducts.filter(p => p.stock >= 50).length;
  const ratingMayor45 = filteredProducts.filter(p => p.rating >= 4.5).length;

  /* TEMA */
  const toggleModoOscuro = () => {
    setTheme(!theme);
    containerRef.current.classList.toggle("modo-oscuro");
  }


  return (
    <div ref={containerRef} className="app">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">
            PROYECTO ABP - Alejo N. Terreno
          </h1>
          <button onClick={toggleModoOscuro}>
            MODO {theme ? "CLARO" : "OSCURO"}
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar producto"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border p-2 w-full max-w-md"
          />

        </div>

        <div className="mt-2">
          <p>Categoria</p>

          <select className="mt-2" onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2">
          <p>Ordenar por</p>

          <select className="mt-2" onChange={(e) => setOrden(e.target.value)}>
            <option value="">No ordenar</option>
            <option value="precio-asc">Precio (menor a mayor)</option>
            <option value="precio-desc">Precio (mayor a menor)</option>
            <option value="rating-asc">Rating (menor a mayor)</option>
            <option value="rating-desc">Rating (mayor a menor)</option>
          </select>
        </div>


        <div className="mt-2">
          <button onClick={() => setShow(!show)}>{show ? "OCULTAR ESTADISTICAS" : "MOSTRAR ESTADISTICAS"}</button>
        </div>

        { show && (<StatsPanel
          totalProducts={totalProducts}
          maxProduct={maxProduct}
          minProduct={minProduct}
          discProduct={discProduct}
          tituloVeinte={tituloVeinte}
          avgRating={avgRating}
          stockMayor50={stockMayor50}
          ratingMayor45={ratingMayor45}
        />)}

        <ProductList products={productosOrdenados} />

        {/*<button 
          disabled={page === 1} 
          onClick={ () => setPage(page - 1)}
          >ANTERIOR</button> 
        {page} 
          <button 
            disabled={page * limite >= total}
            onClick={ () => setPage(page + 1)}>SIGUIENTE</button>*/ 

             // se usaba para paginación
        }
        
      
    </div>
  );
}

export default App;