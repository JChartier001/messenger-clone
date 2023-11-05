import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import {cn} from '@/app/libs/utils';

interface SelectProps{
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  disabled?: boolean;
  options: string[];

}

const Select: React.FC<SelectProps> = ({label, id, register, errors, required, disabled, options}) => {
  return (
		<div>
			<label
				htmlFor={id}
				className='block text-sm font-medium leading-6 text-gray-900'
			>
				{label}
			</label>
			<select
				id={id}
				{...register(id, { required })}
				className={cn(
					'mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6',
					errors[id] && 'focus:ring-rose-500',
					disabled && 'opacity-50 cursor-default'
				)}
				defaultValue='Canada'
			>
				{options.map(option => (
					<option>{option}</option>
				))}
			</select>
		</div>
	);
}

export default Select