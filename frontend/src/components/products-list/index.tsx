import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

export const ProductsList = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div>
        <p>No hay productos disponibles.</p>
        <Link to="/upload">Subir productos</Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="mb-5">Productos</h2>
      <table className="w-full border-collapse shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left border-b-2 border-gray-300">Nombre</th>
            <th className="p-3 text-center border-b-2 border-gray-300">Precio</th>
            <th className="p-3 text-center border-b-2 border-gray-300">Fecha de expiración</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.name} className="border-b border-gray-200">
              <td className="p-3 text-left">{product.name}</td>
              <td className="p-3 text-center">${product.price}</td>
              <td className="p-3 text-center">{product['expiration_date']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 