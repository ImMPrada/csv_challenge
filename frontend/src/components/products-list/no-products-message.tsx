import { Link } from 'react-router-dom';

export const NoProductsMessage = () => {

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
}; 