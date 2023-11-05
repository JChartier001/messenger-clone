'use client';

import axios from 'axios';
import { useState } from 'react';

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Certification, CertificationType } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import Select from '@/app/components/ui/Select';

import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';

import Separator from '@/app/components/ui/Separator';
import Heading from '@/app/components/ui/Heading';
import AlertModal from '@/app/components/modals/AlertModal';
import ImageUpload from '@/app/components/ui/ImageUpload';

interface CertificationsFormProps {
	initialData: Certification | null;
	types: CertificationType[];
}

const CertificationForm: React.FC<CertificationsFormProps> = ({
	initialData,
	types,
}) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? 'Edit Certification' : 'Create Certification';
	const description = initialData
		? 'Edit a Certification.'
		: 'Add a new certification';
	const toastMessage = initialData
		? 'Certification updated.'
		: 'Certification created. Pending approval';
	const action = initialData ? 'Save changes' : 'Create';

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FieldValues>({
		defaultValues: initialData || {
			typeId: '',
			image: null,
			description: '',
		},
	});

	const image = watch('image');
	const type = watch('typeId');
	const onSubmit: SubmitHandler<FieldValues> = async data => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params?.farmId}/certifications/${params?.certificationId}`,
					data
				);
			} else {
				await axios.post(`/api/${params?.farmId}/certifications`, data);
			}
			router.refresh();
			router.push(`/farm/${params?.farmId}/certifications`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(
				`/api/${params?.farmId}/certifications/${params?.certificationId}`
			);
			router.refresh();
			router.push(`/farm/${params?.farmId}/certifications`);
			toast.success('Certification deleted.');
		} catch (error: any) {
			toast.error(
				'Something went wrong while deleting the certification. Please try again.'
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			{/* <AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/> */}
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{/* {initialData && (
					<Button
						disabled={loading}
						variant='destructive'
						size='sm'
						onClick={() => setOpen(true)}
					>
						<Trash className='h-4 w-4' />
					</Button>
				)} */}
			</div>
			<Separator />

			<form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-8'>
				{/* <ImageUpload
					label='Upload certification documentation'
					id='imageUrl'
					register={register}
					errors={errors}
					disabled={loading}
					value={image}
					setValue={setValue}
				/> */}

				<div className='gap-8 md:grid md:grid-cols-2'>
					{/* <Select
						label='Certification Type'
						id='typeId'
						register={register}
						errors={errors}
						required
						disabled={loading}
						options={types.map(type => type.name)}
					/> */}
				
					{/* {type === 'other' && (
						<Input
							id='description'
							label='Certification Description'
							disabled={loading}
              register={register}
							errors={errors}
							placeholder='Describe certification'
						/>
					)} */}
				</div>
				<Button disabled={loading} className='ml-auto' type='submit'>
					{action}
				</Button>
			</form>
		</>
	);
};
export default CertificationForm;
