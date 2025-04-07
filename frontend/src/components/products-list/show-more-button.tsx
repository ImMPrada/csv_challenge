export const ShowMoreButton = ({onClick}: {onClick: () => void}) => {
  return (
    <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
      <button
        onClick={onClick}
        className="w-full md:w-auto px-8 py-3 bg-purple text-white rounded-lg hover:bg-purple-dark transition-colors duration-200 font-semibold text-lg shadow-md hover:shadow-lg inline-flex items-center justify-center space-x-2"
      >
        <span>Load More Products</span>
      </button>
    </div>
  );
}; 