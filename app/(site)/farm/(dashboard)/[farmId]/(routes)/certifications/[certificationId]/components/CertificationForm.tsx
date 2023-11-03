'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Trash } from 'lucide-react';
import { Certifications, CertificationType } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

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
import ImageUpload from '@/components/ui/ImageUpload';

const formSchema = z.object({
  typeId: z.string().min(1),
  imageUrl: z.object({ url: z.string() }).array(),
  description: z.string().optional(),
});

type CertificationsFormValues = z.infer<typeof formSchema>;

interface CertificationsFormProps {
  initialData: Certifications | null;
  types: CertificationType[];
}

const BillboardForm: React.FC<CertificationsFormProps> = ({
  initialData,
  types,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

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

  const form = useForm<CertificationsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      typeId: '',
      imageUrl: [],
      description: '',
    },
  });

  const onSubmit = async (data: CertificationsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.farmId}/certifications/${params.certificationId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.farmId}/certifications`, data);
      }
      router.refresh();
      router.push(`/farm/${params.farmId}/certifications`);
      toast({ description: toastMessage });
    } catch (error: any) {
      toast({
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const values = form.watch();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.farmId}/certifications/${params.certificationId}`
      );
      router.refresh();
      router.push(`/farm/${params.farmId}/certifications`);
      toast({ description: 'Certification deleted.' });
    } catch (error: any) {
      toast({
        description:
          'Something went wrong while deleting the certification. Please try again.',
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
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload certification documentation</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='gap-8 md:grid md:grid-cols-2'>
            <FormField
              control={form.control}
              name='typeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Type</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {values.typeId === 'other' && (
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certification Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Describe certification'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default BillboardForm;
