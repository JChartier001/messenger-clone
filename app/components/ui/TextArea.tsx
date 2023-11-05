import * as React from "react"
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { cn } from "@/app/libs/utils"

interface TextAreaProps {
	label: string;
	id: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
}



const TextArea: React.FC<TextAreaProps> = ({
	label,
	id,
	required,
	register,
	errors,
	disabled,
	className,
	placeholder,
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className='block text-sm font-medium leading-6 text-gray-900'
			>
				{label}
			</label>
			<div className='mt-2'>
				<textarea
					{...register(id, { required })}
					rows={4}
          id={id}
          disabled={disabled}

          className={cn('block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6', errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default',)}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default TextArea;