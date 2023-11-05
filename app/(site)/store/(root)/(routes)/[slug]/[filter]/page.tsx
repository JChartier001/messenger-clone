"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "next/navigation";
import ProductList from "@/app/components/ProductList";

const FilterPage = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/category/${params?.slug}/${params?.filter}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, [params?.slug, params?.filter]);

  return <ProductList items={products} title={""} />;
};

export default FilterPage;
