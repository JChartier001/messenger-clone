'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '@/app/components/ProductList';
import Billboard from '@/app/components/ui/Billboard';

const StorePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return (
    <div className='w-full pb-5'>
      <Billboard slug={'all'} />
      <ProductList items={products} title={''} />
    </div>
  );
};

export default StorePage;
