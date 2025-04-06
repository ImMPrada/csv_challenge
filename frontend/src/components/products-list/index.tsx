import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

export const ProductsList = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div className="p-5 text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="p-5 text-red">Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="p-5 text-center">
        <p className="mb-4 text-gray-600">No products available.</p>
        <Link 
          to="/upload" 
          className="text-purple hover:text-purple-dark hover:cursor-pointer transition-colors duration-200"
        >
          Upload products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800">Products</h2>
      <table className="w-full border-collapse shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left border-b-2 border-gray-300">Name</th>
            <th className="p-3 text-center border-b-2 border-gray-300">Price</th>
            <th className="p-3 text-center border-b-2 border-gray-300">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.name} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
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