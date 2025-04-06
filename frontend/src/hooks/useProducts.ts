import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { config } from '../config';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'name' | 'expiration_date';

interface ProductsResponse {
  products: Product[];
  pagy: {
    page: number;
    items: number;
    pages: number;
    count: number;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const fetchProducts = useCallback(async (page: number, search: string = '', field: SortField | null = null, direction: SortDirection = null) => {
    try {
      const url = new URL(`${config.apiUrl}/api/v1/products`);
      url.searchParams.append('page', page.toString());
      
      if (search) {
        url.searchParams.append('name', search);
      }

      if (field && direction) {
        url.searchParams.append(`sort_by_${field}`, direction);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const responseText = await response.text();

      let data: ProductsResponse;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }

      setHasNextPage(data.pagy.page < data.pagy.pages);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1, searchTerm, sortField, sortDirection);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, sortField, sortDirection, fetchProducts]);

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setIsLoading(true);
    await fetchProducts(nextPage, searchTerm, sortField, sortDirection);
    setCurrentPage(nextPage);
  };

  const handleSort = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  return { 
    products, 
    isLoading, 
    error,
    loadMore,
    hasMore: hasNextPage,
    searchTerm,
    setSearchTerm,
    handleSort
  };
}; 