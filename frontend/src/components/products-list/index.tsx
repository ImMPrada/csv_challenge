import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

const formatPrice = (price: number, rate: number) => {
  return (price * rate).toFixed(2);
};

export const ProductsList = () => {
  const { products, isLoading, error, loadMore, hasMore, searchTerm, setSearchTerm } = useProducts();

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
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b-2 border-gray-300">Name</th>
              <th className="p-3 text-center border-b-2 border-gray-300">USD</th>
              <th className="p-3 text-center border-b-2 border-gray-300">EUR</th>
              <th className="p-3 text-center border-b-2 border-gray-300">GBP</th>
              <th className="p-3 text-center border-b-2 border-gray-300">JPY</th>
              <th className="p-3 text-center border-b-2 border-gray-300">CAD</th>
              <th className="p-3 text-center border-b-2 border-gray-300">COP</th>
              <th className="p-3 text-center border-b-2 border-gray-300">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const rates = product.foreign_exchange?.rates || [];
              const eurRate = rates.find(rate => rate.currency === 'eur')?.rate || 0;
              const gbpRate = rates.find(rate => rate.currency === 'gbp')?.rate || 0;
              const jpyRate = rates.find(rate => rate.currency === 'jpy')?.rate || 0;
              const cadRate = rates.find(rate => rate.currency === 'cad')?.rate || 0;
              const copRate = rates.find(rate => rate.currency === 'cop')?.rate || 0;

              return (
                <tr key={product.name} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-3 text-left">{product.name}</td>
                  <td className="p-3 text-center">${product.price}</td>
                  <td className="p-3 text-center">€{formatPrice(product.price, eurRate)}</td>
                  <td className="p-3 text-center">£{formatPrice(product.price, gbpRate)}</td>
                  <td className="p-3 text-center">¥{formatPrice(product.price, jpyRate)}</td>
                  <td className="p-3 text-center">C${formatPrice(product.price, cadRate)}</td>
                  <td className="p-3 text-center">${formatPrice(product.price, copRate)} COP</td>
                  <td className="p-3 text-center">{product['expiration_date']}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {hasMore && (
          <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
            <button
              onClick={loadMore}
              className="w-full md:w-auto px-8 py-3 bg-purple text-white rounded-lg hover:bg-purple-dark transition-colors duration-200 font-semibold text-lg shadow-md hover:shadow-lg inline-flex items-center justify-center space-x-2"
            >
              <span>Load More Products</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 