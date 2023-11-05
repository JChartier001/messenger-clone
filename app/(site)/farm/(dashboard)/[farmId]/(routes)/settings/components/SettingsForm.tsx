'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Farm } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/app/libs/utils';

import Input  from '@/app/components/ui/Input';
import TextArea, { Textarea } from '@/app/components/ui/TextArea';
import Button from '@/app/components/ui/Button';

import Separator from '@/app/components/ui/Separator';
import Heading from '@/app/components/ui/Heading';
import AlertModal from '@/app/components/modals/AlertModal';
import Checkbox  from '@/app/components/ui/Checkbox';
import ImageUpload from '@/app/components/ui/ImageUpload';
import LogoUpload from '@/app/components/ui/LogoUpload';






interface SettingsFormProps {
  initialData: Farm | null;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Farm' : '';
  const description = initialData ? 'Edit your farm.' : '';
  const toastMessage = initialData ? 'Farm updated.' : 'Farm created.';
  const action = initialData ? 'Save changes' : 'Create';

  const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm<FieldValues>({
  
    defaultValues: initialData || {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      bio: '',
      policies: '',
      email: '',
      phone: '',
      pickup: false,
      delivery: false,
      image: null,
      logo: null,
      pickupInfo: '',
      deliveryRadius: '',
    },
  });

  const image = watch('image')
  const logo = watch('logo')

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/farms/${params?.farmId}`, data);
      } else {
        const response = await axios.post('/api/farms', data);

        router.push(`/farm/${response.data.id}`);
      }
      router.refresh();

      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
console.log(watch())
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/farm/${params?.farmId}`);
      router.refresh();
      router.push('/farm');
      toast.success('Farm deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all products and categories first.'
       );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div
				className={cn(
					' items-center justify-between',
					initialData ? 'flex' : 'hidden'
				)}
			>
				<Heading title={title} description={description} />
				<Button disabled={loading} onClick={() => setOpen(true)}>
					<Trash className='h-4 w-4' />
				</Button>
			</div>
			<Separator />
			<form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-8'>
				<div className='flex grid-cols-2 flex-col gap-8 md:grid'>
					<Input
						id='name'
						label='Farm Name'
						register={register}
						required
						errors={errors}
						disabled={loading}
						placeholder='Name Your Agricultural Haven Here'
					/>
					<Input
						disabled={loading}
						label='Farm Address'
						id='address'
						errors={errors}
						register={register}
						required
						placeholder="Indicate Your Homestead's Locale"
					/>
					<Input
						disabled={loading}
						label='City'
						id='city'
						required
						register={register}
						errors={errors}
						placeholder="Indicate Your Farm's Hometown"
					/>
					<Input
						disabled={loading}
						label='State'
						id='state'
						required
						register={register}
						errors={errors}
						placeholder='Indicate the Locale of Your Agrarian Haven'
					/>
					<Input
						disabled={loading}
						label='Zip Code'
						id='zip'
						required
						register={register}
						errors={errors}
						placeholder="Drop in Your Farm's ZIP Code to Cultivate Connection"
					/>
					<Input
						disabled={loading}
						label='Email Address'
						id='email'
						required
						register={register}
						errors={errors}
						placeholder="Drop your email address like it's hot"
					/>
					<Input
						disabled={loading}
						label='Phone Number'
						id='phone'
						required
						register={register}
						errors={errors}
						placeholder='Drop Your Digits'
					/>
					<Checkbox
						disabled={loading}
						label='Customer Pickup'
						id='pickup'
						required
						register={register}
						errors={errors}
						description='Embrace the rustic joy of direct farm-to-table service by allowing customers to collect their bounty straight from your fields'
						// 'I would like to offer customer pickup for orders.'
					/>
					<Input
						disabled={loading}
						label='PickUp Hours'
						id='pickupInfo'
						required
						register={register}
						errors={errors}
						className={watch('pickup') ? 'grid' : 'hidden'}
						placeholder='8:00AM - 3:00PM'
					/>
					<Checkbox
						disabled={loading}
						label='Local Delivery'
						id='delivery'
						required
						register={register}
						errors={errors}
						description=' Bring the Bounty of Your Farm Directly to their Doorstep '
						// 'I would like to offer local delivery for orders.'
					/>
					<Input
						disabled={loading}
						label='Delivery Radius'
						id='deliveryRadius'
						required
						register={register}
						errors={errors}
						className={watch('delivery') ? 'grid' : 'hidden'}
						placeholder='Enter your local delivery radius in miles'
					/>
				</div>
				<div className='grid grid-cols-2'>
					<ImageUpload
						label='Farm Image'
						id='image'
						register={register}
						errors={errors}
						disabled={loading}
						
					
						value={image}
						setValue={setValue}
					/>
					<ImageUpload
						label='Farm Logo'
						id='logo'
						register={register}
						errors={errors}
						disabled={loading}
					
						value={logo}
						setValue={setValue}
					/>
				</div>
				<TextArea
					disabled={loading}
					label='Farm Bio'
					id='bio'
					required
					register={register}
					errors={errors}
					placeholder="Craft Your Farm's Story Here "
				/>

				<TextArea
					disabled={loading}
					label='Farm Policies'
					id='policies'
					required
					register={register}
					errors={errors}
					placeholder="Outline Your Farm's Commitment: Share Your Delivery, Return, and Service Policies Here."
				/>
				<Button disabled={loading} className='ml-auto' type='submit'>
					{action}
				</Button>
			</form>
			<Separator />
		</>
	);
};

export default SettingsForm;
