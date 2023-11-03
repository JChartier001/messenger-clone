import React from 'react';
import { Product } from '@/app/types';

interface DescriptionProps {
  data: Product;
}

const Description: React.FC<DescriptionProps> = ({ data }) => {
  return <div>{data.longDescription}</div>;
};

export default Description;
