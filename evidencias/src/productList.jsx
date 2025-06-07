export function ProductList({ products }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Productos</h2>

      {products.length === 0 && <div className="font-medium">Sin coincidencias</div>}

      <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 list-none p-0">
        {products.map((p) => (
          <li key={p.id} className="border p-2">
            <img src={p.thumbnail} alt={p.title} className="w-full h-auto mb-2" />
            <p className="font-medium">{p.title}</p>
            <p>${p.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}