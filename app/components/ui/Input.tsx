import * as React from 'react';

import { cn } from '@/app/libs/utils';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	required?: boolean;
	disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, label, id, type, register, required, errors,disabled, ...props },
		ref
	) => {
		return (
			<div>
				<label htmlFor={id} className='block text-sm font-medium leading-6'>
					{label}
				</label>
				<input
					autoComplete={id}
					disabled={disabled}
					{...register(id!, { required })}
					type={type}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
						errors[id!] && 'focus:ring-rose-500',
						disabled && 'opacity-50 cursor-default',
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = 'Input';

export default Input;
