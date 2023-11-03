'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import axios, { AxiosResponse } from 'axios';
import { Product } from '@/types';

import ProductList from '@/components/ProductList';
import Heading from '@/components/ui/Heading';

const FavoritesPage = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productFetchPromises = user?.publicMetadata.favorites.product.map(
          (id: string) => axios.get(`/api/products/${id}`)
        );

        const productsResponses = await Promise.all(productFetchPromises);

        const fetchedProducts = productsResponses.map(
          (response: AxiosResponse) => response.data
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, [user]);

  return (
    <div className='m-5'>
      <Heading
        title='Favorite Products'
        description='View all of your favorite products'
      />
      <ProductList items={products} title='' />
    </div>
  );
};

export default FavoritesPage;
