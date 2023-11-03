'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Trash } from 'lucide-react';
import { Farm } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/ui/Heading';
import AlertModal from '@/components/modals/AlertModal';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from '@/components/ui/ImageUpload';

const formSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(5).max(5),
  bio: z.string(),
  policies: z.string(),
  email: z.optional(z.string().email()),
  phone: z.string(),
  pickup: z.boolean(),
  delivery: z.boolean(),
  image: z.object({ url: z.string() }).array(),
  logo: z.object({ url: z.string() }).array(),
  pickupInfo: z.string(),
  deliveryRadius: z.string(),
});

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Farm | null;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Farm' : '';
  const description = initialData ? 'Edit your farm.' : '';
  const toastMessage = initialData ? 'Farm updated.' : 'Farm created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
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
      image: [],
      logo: [],
      pickupInfo: '',
      deliveryRadius: '',
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/farms/${params.farmId}`, data);
      } else {
        const response = await axios.post('/api/farms', data);

        router.push(`/farm/${response.data.id}`);
      }
      router.refresh();

      toast({ description: toastMessage, variant: 'success' });
    } catch (error: any) {
      toast({ description: 'Something went wrong.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/farm/${params.farmId}`);
      router.refresh();
      router.push('/farm');
      toast({ description: 'Farm deleted.' });
    } catch (error: any) {
      toast({
        description: 'Make sure you removed all products and categories first.',
        variant: 'destructive',
      });
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
        <Button
          disabled={loading}
          variant='destructive'
          size='sm'
          onClick={() => setOpen(true)}
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='flex grid-cols-3 flex-col gap-8 md:grid'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Farm name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Farm Address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='City' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='State' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='zip'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Zip Code'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>

                  <FormControl>
                    <Input disabled={loading} placeholder='Phone' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pickup'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-3 space-y-0 rounded-md '>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Customer Pickup</FormLabel>
                    <FormDescription>
                      I would like to offer customer pickup for orders
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pickupInfo'
              render={({ field }) => (
                <FormItem
                  className={cn('', form.watch('pickup') ? 'grid' : 'hidden')}
                >
                  <FormLabel>Pickup Hours</FormLabel>

                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='8:00AM - 3:00PM'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter hours for pickup</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='delivery'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-3 space-y-0 rounded-md '>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Local Delivery</FormLabel>
                    <FormDescription>
                      I would like to offer local delivery for orders.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='deliveryRadius'
              render={({ field }) => (
                <FormItem
                  className={cn('', form.watch('delivery') ? 'grid' : 'hidden')}
                >
                  <FormLabel>Delivery Radius</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='20' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your local delivery radius in miles
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='logo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Logo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Bio</FormLabel>

                <FormControl>
                  <Textarea
                    rows={5}
                    disabled={loading}
                    placeholder='Farm Bio'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='policies'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Policies</FormLabel>

                <FormControl>
                  <Textarea
                    rows={5}
                    disabled={loading}
                    placeholder='Farm Policies'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default SettingsForm;
