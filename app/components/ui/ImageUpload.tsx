'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import Button  from '@/app/components/ui/Button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { FieldValues, UseFormRegister,  FieldErrors, UseFormSetValue} from 'react-hook-form';

interface ImageUploadProps {
	disabled?: boolean;
	value: string | string[] ;
	multiple?: boolean
	id: string;
	label?: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	required?: boolean;
	setValue?: UseFormSetValue<FieldValues>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	value,
	id,
	label,
	register,
	required,
	errors,
	setValue,
	multiple = false
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		if (result.event === 'success') {		
			setValue && setValue(id, result.info.secure_url);
		}
	};

	

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<label htmlFor={id} className='block text-sm font-medium leading-6'>
				{label}
			</label>
			<div className='mb-4 flex items-center gap-4'>
				{multiple && typeof value === 'object'
					? value?.map(url => (
							<div
								key={url}
								className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
							>
								<div className='absolute right-2 top-2 z-10'>
									<Button
										type='button'
										onClick={() =>
											setValue &&
											setValue(
												id,
												value.filter((v: string) => v !== url)
											)
										}
										variant='destructive'
										size='sm'
									>
										<Trash className='h-4 w-4' />
									</Button>
								</div>
								<Image fill className='object-cover' alt='Image' src={url} />
							</div>
					  ))
					: typeof value === 'string' && (
							<div className='relative h-[200px] w-[200px] overflow-hidden rounded-md'>
								<div className='absolute right-2 top-2 z-10'>
									<Button
										type='button'
										variant='destructive'
										size='sm'
										onClick={() =>
											setValue &&
											setValue(
												id,
												null
											)
										}
									>
										<Trash className='h-4 w-4' />
									</Button>
								</div>
								<Image
									fill
									className='object-cover'
									alt='Image'
									src={`${value}`}
								/>
							</div>
					  )}
			</div>
			<CldUploadWidget
				{...register(id, { required })}
				onUpload={onUpload}
				uploadPreset='ecommerce-next'
			>
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							type='button'
							disabled={disabled}
							variant='secondary'
							onClick={onClick}
						>
							<ImagePlus className='mr-2 h-4 w-4' />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
