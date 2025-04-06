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
    <div>
      <h2>Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <p>Fecha de expiración: {product.expirationDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}; 