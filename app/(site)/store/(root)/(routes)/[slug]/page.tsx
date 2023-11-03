'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'next/navigation';
import ProductList from '@/components/ProductList';

const CategoryPage = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/category/${params.slug}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, [params.slug]);

  return <ProductList items={products} title={''} />;
};

export default CategoryPage;
