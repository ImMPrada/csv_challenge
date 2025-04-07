import { useProducts } from '../../hooks/useProducts';
import { SortButton } from '../sort-button';
import { NameSearch } from './name-search';
import { NoProductsMessage } from './no-products-message';
import { ShowMoreButton } from './show-more-button';
const formatPrice = (price: number, rate: number) => {
  return (price * rate).toFixed(2);
};

export const ProductsList = () => {
  const { products, isLoading, error, loadMore, hasMore, searchTerm, setSearchTerm, handleSort } = useProducts();

  if (isLoading) {
    return <div className="p-5 text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="p-5 text-red">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <NoProductsMessage />
  }

  return (
    <div className="p-5">
      <NameSearch value={searchTerm} onChange={setSearchTerm} />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b-2 border-gray-300">
                <div className="flex items-center space-x-2">
                  <span>Name</span>
                  <SortButton onSort={(direction) => handleSort('name', direction)} />
                </div>
              </th>
              <th className="p-3 text-center border-b-2 border-gray-300">USD</th>
              <th className="p-3 text-center border-b-2 border-gray-300">EUR</th>
              <th className="p-3 text-center border-b-2 border-gray-300">GBP</th>
              <th className="p-3 text-center border-b-2 border-gray-300">JPY</th>
              <th className="p-3 text-center border-b-2 border-gray-300">CAD</th>
              <th className="p-3 text-center border-b-2 border-gray-300">COP</th>
              <th className="p-3 text-center border-b-2 border-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <span>Expiration Date</span>
                  <SortButton onSort={(direction) => handleSort('expiration_date', direction)} />
                </div>
              </th>
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
          <ShowMoreButton onClick={loadMore} />
        )}
      </div>
    </div>
  );
}; 