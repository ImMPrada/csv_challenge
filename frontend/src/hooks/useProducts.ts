import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { config } from '../config';

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

  const fetchProducts = useCallback(async (page: number, search: string = '') => {
    try {
      const url = new URL(`${config.apiUrl}/api/v1/products`);
      url.searchParams.append('page', page.toString());
      if (search) {
        url.searchParams.append('name', search);
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
      fetchProducts(1, searchTerm);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, fetchProducts]);

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setIsLoading(true);
    await fetchProducts(nextPage, searchTerm);
    setCurrentPage(nextPage);
  };

  return { 
    products, 
    isLoading, 
    error,
    loadMore,
    hasMore: hasNextPage,
    searchTerm,
    setSearchTerm
  };
}; 