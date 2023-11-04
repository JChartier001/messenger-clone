'use client';

import React from 'react';
import { SunMoon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Button from '@/app/components/ui/Button';


import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/DropdownMenu';


const ThemeToggle = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='text'
					className='group rounded-full  bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '
				>
			
						<Sun
							className='flex text-black group-hover:text-white dark:hidden dark:text-white dark:group-hover:text-black '
							size={25}
						/>
						<SunMoon
							className='hidden text-white group-hover:text-black dark:flex'
							size={25}
						/>
						<span className='sr-only'>Toggle theme</span>
				
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeToggle;
