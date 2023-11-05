'use client';
import React from 'react';
import clsx from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/libs/utils';

interface ButtonProps  {
	type?: 'button' | 'submit' | 'reset' | undefined;
	fullWidth?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	variant?: VariantProps<typeof buttonVariants>['variant'];
	size?: VariantProps<typeof buttonVariants>['size'];
	className?: string;
}

export const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				text: 'bg-transparent',
				disabled: 'opacity-50 cursor-default',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);


const Button: React.FC<ButtonProps> = ({
	type,
	fullWidth,
	onClick,
	disabled,
  children,
  variant, size, className
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={cn(buttonVariants({ variant, size, className, }),
				disabled && 'opacity-50 cursor-default',
				fullWidth && 'w-full',
	
			)}
		>
			{children}
		</button>
	);
};

export default Button;
