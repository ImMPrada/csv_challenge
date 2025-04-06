import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;

interface SortButtonProps {
  onSort: (direction: SortDirection) => void;
}

export const SortButton = ({ onSort }: SortButtonProps) => {
  const [direction, setDirection] = useState<SortDirection>(null);

  const handleClick = () => {
    let newDirection: SortDirection;
    
    switch (direction) {
      case null:
        newDirection = 'asc';
        break;
      case 'asc':
        newDirection = 'desc';
        break;
      case 'desc':
        newDirection = null;
        break;
    }

    setDirection(newDirection);
    onSort(newDirection);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
    >
      <span>Sort</span>
      {direction && (
        <span className="text-sm">
          {direction === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </button>
  );
}; 