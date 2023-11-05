// import * as React from 'react';

// import { cn } from '@/app/libs/utils';
// import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

// export interface InputProps
// 	extends React.InputHTMLAttributes<HTMLInputElement> {
// 	label?: string;
// 	register: UseFormRegister<FieldValues>;
// 	errors: FieldErrors<FieldValues>;
// 	required?: boolean;
// 	disabled?: boolean;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
// 	(
// 		{ className, label, id, type, register, required, errors,disabled, ...props },
// 		ref
// 	) => {
// 		return (
// 			<div>
// 				<label htmlFor={id} className='block text-sm font-medium leading-6'>
// 					{label}
// 				</label>
// 				<input
// 					autoComplete={id}
// 					disabled={disabled}
// 					{...register(id!, { required })}
// 					type={type}
// 					className={cn(
// 						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
// 						errors[id!] && 'focus:ring-rose-500',
// 						disabled && 'opacity-50 cursor-default',
// 						className
// 					)}
// 					ref={ref}
// 					{...props}
// 				/>
// 			</div>
// 		);
// 	}
// );
// Input.displayName = 'Input';

// export default Input;


'use client';
import React from 'react';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
	label: string;
	id: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	type,
	required,
	register,
	errors,
	disabled,
	className,
	placeholder
}) => {
	return (
		<div className={clsx(className)}>
			<label htmlFor={id} className='block text-sm font-medium leading-6'>
				{label}
			</label>
			<div className='mt-2'>
				<input
					id={id}
					type={type}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						`form-input block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`,
						errors[id] && 'focus:ring-rose-500',
						disabled && 'opacity-50 cursor-default',
					)}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default Input;