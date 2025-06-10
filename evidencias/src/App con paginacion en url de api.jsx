import './App.css';
import axios from "axios";
import { useEffect, useState, useRef } from 'react';
import { StatsPanel, Graficos } from './StatsPanel';
import { ProductList } from "./ProductList";
import * as XLSX from "xlsx";

function App() {
  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [show, setShow] = useState(true);
  const [theme, setTheme] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [orden, setOrden] = useState("");
  const [formato, setFormato] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const containerRef = useRef(null);

  useEffect(() => {
    const skip = (page - 1) * limit;
    const categoriaUrl = categoriaSeleccionada
      ? `category/${categoriaSeleccionada}`
      : "";

    axios.get(`https://dummyjson.com/products/${categoriaUrl}?limit=${limit}&skip=${skip}`)
      .then((res) => {
        setProducts(res.data.products);
      });

    axios.get(`https://dummyjson.com/products/category-list`)
      .then((res) => {
        setCategorias(res.data);
      });
  }, [page, categoriaSeleccionada]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(busqueda.toLowerCase())
  );

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

  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(...filteredProducts.map(p => p.price));
  const minProduct = Math.min(...filteredProducts.map(p => p.price));
  const discProduct = Math.max(...filteredProducts.map(p => p.discountPercentage));
  const tituloVeinte = filteredProducts.filter(p => p.title.length > 20).length;
  const avgRating = filteredProducts.length > 0
    ? (filteredProducts.reduce((a, p) => a + p.rating, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const stockMayor50 = filteredProducts.filter(p => p.stock >= 50).length;
  const ratingMayor45 = filteredProducts.filter(p => p.rating >= 4.5).length;
  const avgPriceCategoria = (filteredProducts.reduce((a, p) => a + p.price, 0) / filteredProducts.length).toFixed(2);

  const toggleModoOscuro = () => {
    setTheme(!theme);
    containerRef.current.classList.toggle("modo-oscuro");
  };

  const dataCategorias = Object.values(filteredProducts.reduce((acc, producto) => {
    const categoria = producto.category;
    if (!acc[categoria]) {
      acc[categoria] = { categoria: categoria, cantidad: 0 };
    }
    acc[categoria].cantidad += 1;
    return acc;
  }, {}));

  const dataLineas = filteredProducts.slice(0, 15).map((producto, index) => ({
    dia: `Día ${index + 1}`,
    precio: producto.price,
  }));

  const dataStock = filteredProducts
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)
    .map(p => ({ nombre: p.title, valor: p.stock }));

  const handleExport = () => {
    if (filteredProducts.length === 0) return;

    if (formato === "JSON") {
      const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.json");
    } else if (formato === "CSV") {
      const header = Object.keys(filteredProducts[0]).join(",");
      const filas = filteredProducts.map((p) => Object.values(p).join(","));
      const csv = [header, ...filas].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.csv");
    } else if (formato === "EXCEL") {
      const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.xlsx");
    }
  };

  const triggerDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <select className="mt-2" onChange={(e) => {
          setCategoriaSeleccionada(e.target.value);
          setPage(1);
        }}>
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
        <button onClick={() => setShow(!show)}>
          {show ? "OCULTAR ESTADISTICAS" : "MOSTRAR ESTADISTICAS"}
        </button>
      </div>

      {show && (
        <StatsPanel
          totalProducts={totalProducts}
          maxProduct={maxProduct}
          minProduct={minProduct}
          discProduct={discProduct}
          tituloVeinte={tituloVeinte}
          avgRating={avgRating}
          stockMayor50={stockMayor50}
          ratingMayor45={ratingMayor45}
          avgPriceCategoria={avgPriceCategoria}
        />
      )}

      <Graficos
        dataCategorias={dataCategorias}
        dataLineas={dataLineas}
        dataStock={dataStock}
      />

      <ProductList products={productosOrdenados} />

      <div className="mt-4 flex gap-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>

      <div className="mt-2">
        <p>Sleccionar formato</p>
        <select className="mt-2" onChange={(e) => setFormato(e.target.value)} value={formato}>
          <option value="JSON">JSON</option>
          <option value="CSV">CSV</option>
          <option value="EXCEL">EXCEL</option>
        </select>
        <button onClick={handleExport}>Exportar archivo</button>
      </div>
    </div>
  );
}

export default App;
