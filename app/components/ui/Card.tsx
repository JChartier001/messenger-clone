import React from 'react'
import { cn } from '@/app/libs/utils'

interface CardProps {
  children: React.ReactNode;
  className?: string;

}

const Card: React.FC<CardProps> = ({ children, className}) => {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-slate-800 p-5', className)}>
		{children}
		</div>
	);
}

export default Card