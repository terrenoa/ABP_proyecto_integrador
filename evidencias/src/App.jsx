import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { StatsPanel } from "./StatsPanel";
import { ProductList } from "./ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(...filteredProducts.map(p => p.price));
  const minProduct = Math.min(...filteredProducts.map(p => p.price));
  const discProduct = Math.max(...filteredProducts.map(p => p.discountPercentage));
  const tituloVeinte = filteredProducts.filter(p => p.title.length > 20).length;
  const avgRating = filteredProducts.length > 0
    ? (filteredProducts.reduce((acumulador, p) => acumulador + p.rating, 0) / filteredProducts.length).toFixed(2)
    : 0;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-700">Evidencias 1 y 2</h1>
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

      <StatsPanel
        totalProducts={totalProducts}
        maxProduct={maxProduct}
        minProduct={minProduct}
        discProduct={discProduct}
        tituloVeinte={tituloVeinte}
        avgRating={avgRating}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;