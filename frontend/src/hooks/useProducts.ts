import { useState, useEffect } from 'react';
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

  const fetchProducts = async (page: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/v1/products?page=${page}`);

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
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setIsLoading(true);
    await fetchProducts(nextPage);
    setCurrentPage(nextPage);
  };

  return { 
    products, 
    isLoading, 
    error,
    loadMore,
    hasMore: hasNextPage
  };
}; 