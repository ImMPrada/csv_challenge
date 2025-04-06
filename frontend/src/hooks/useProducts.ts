import { useState, useEffect } from 'react';
import { Product } from '../types/product';

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
        const response = await fetch('http://localhost:3000/api/v1/products');
        
        // Log the response status and headers
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        // Log the raw response text for debugging
        const responseText = await response.text();
        console.log('Raw response:', responseText);

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