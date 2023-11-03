'use client';

import axios from 'axios';
import { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/app/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/app/components/ui/DropdownMenu';
import AlertModal from '@/app/components/modals/AlertModal';

import { CertificationColumn } from './columns';

interface CellActionProps {
  data: CertificationColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.farmId}/certifications/${data.id}`);
      toast({ description: 'Certification deleted.' });
      router.refresh();
    } catch (error) {
      toast({
        description:
          'An error occurred while deleting the certification. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ description: 'Certification ID copied to clipboard.' });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/farm/${params.farmId}/certifications/${data.id}`)
            }
          >
            <Edit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
