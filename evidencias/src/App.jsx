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

  /*REFERENCIAS*/

  const containerRef = useRef(null);

  /*DATOS*/

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  /* FILTRO*/

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  /* ESTADISITCAS*/

  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(...filteredProducts.map(p => p.price));
  const minProduct = Math.min(...filteredProducts.map(p => p.price));
  const discProduct = Math.max(...filteredProducts.map(p => p.discountPercentage));
  const tituloVeinte = filteredProducts.filter(p => p.title.length > 20).length;
  const avgRating = filteredProducts.length > 0
    ? (filteredProducts.reduce((acumulador, p) => acumulador + p.rating, 0) / filteredProducts.length).toFixed(2)
    : 0;

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

        <button onClick={() => setShow(!show)}>{show ? "OCULTAR ESTADISTICAS" : "MOSTRAR ESTADISTICAS"}</button>

        { show && (<StatsPanel
          totalProducts={totalProducts}
          maxProduct={maxProduct}
          minProduct={minProduct}
          discProduct={discProduct}
          tituloVeinte={tituloVeinte}
          avgRating={avgRating}
        />)}

        <ProductList products={filteredProducts} />
      
    </div>
  );
}

export default App;