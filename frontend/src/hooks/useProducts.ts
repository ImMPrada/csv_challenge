import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { config } from '../config';

interface ProductsResponse {
  products: Product[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/v1/products`);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const responseText = await response.text();

        // Try to parse the response
        let data: ProductsResponse;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parsing error:', parseError);
          throw new Error('Invalid JSON response from server');
        }

        setProducts(data.products);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}; 