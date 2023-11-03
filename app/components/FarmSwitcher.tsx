'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFarmModal } from '@/hooks/use-farm-modal';
import { useParams, useRouter } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface farmSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

const FarmSwitcher = ({ className, items = [] }: farmSwitcherProps) => {
  const params = useParams();
  const router = useRouter();
  const farmModal = useFarmModal();
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentFarm = formattedItems.find(
    (item) => item.value === params.farmId
  );
  const [open, setOpen] = React.useState(false);

  const onFarmSelect = (farm: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/farm/${farm.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a farm'
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          {currentFarm?.label}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search farm...' />
            <CommandEmpty>No farm found.</CommandEmpty>
            <CommandGroup heading='Farms'>
              {formattedItems.map((farm) => (
                <CommandItem
                  key={farm.value}
                  onSelect={() => onFarmSelect(farm)}
                  className='text-sm'
                >
                  <StoreIcon className='mr-2 h-4 w-4' />
                  {farm.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentFarm?.value === farm.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);

                  router.push('/farm/create');
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create new farm
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FarmSwitcher;
