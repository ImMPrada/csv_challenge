import { Link } from 'react-router-dom';

const PagesLinks = () => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 flex items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          CSV Challenge
        </Link>
      </div>
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        <Link
          to="/upload"
          className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
        >
          Upload
        </Link>
        <Link
          to="/products"
          className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
        >
          Products
        </Link>
      </div>
    </div>
  );
};

export default PagesLinks; 