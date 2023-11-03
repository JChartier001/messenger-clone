'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Trash } from 'lucide-react';
import { UnitLabel } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/ui/Heading';
import AlertModal from '@/components/modals/AlertModal';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: UnitLabel | null;
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit  unit label' : 'Create unit label';
  const description = initialData
    ? 'Edit a unit label.'
    : 'Add a new unit label';
  const toastMessage = initialData ? 'Size updated.' : 'Size created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.farmId}/sizes/${params.sizeId}`, data);
      } else {
        await axios.post(`/api/${params.farmId}/sizes`, data);
      }
      router.refresh();
      router.push(`/farm/${params.farmId}/sizes`);
      toast({ description: toastMessage });
    } catch (error: any) {
      toast({ description: 'Something went wrong.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.farmId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/farm/${params.farmId}/sizes`);
      toast({ description: 'Size deleted.', variant: 'success' });
    } catch (error: any) {
      toast({
        description:
          'Make sure you removed all products using this label first.',
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
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='gap-8 md:grid md:grid-cols-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Label name i.e. bunch of 5 bananas, 1lb of apples, etc.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='approximate weight of the unit i.e. 1lb, 5oz, etc.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
