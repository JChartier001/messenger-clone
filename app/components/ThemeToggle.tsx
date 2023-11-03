'use client';

// import React from 'react';
// import { SunMoon, Sun } from 'lucide-react';
// import { useTheme } from 'next-themes';

// const ThemeToggle = () => {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '>
//           <ToolTip content='Toggle theme'>
//             <Sun
//               className='flex text-black group-hover:text-white dark:hidden dark:text-white dark:group-hover:text-black '
//               size={25}
//             />
//             <SunMoon
//               className='hidden text-white group-hover:text-black dark:flex'
//               size={25}
//             />
//             <span className='sr-only'>Toggle theme</span>
//           </ToolTip>
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align='end'>
//         <DropdownMenuItem onClick={() => setTheme('light')}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('dark')}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('system')}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };


import { Menu } from '@headlessui/react';
import { SunMoon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
    const { setTheme } = useTheme();
	return (
		<Menu>
			<Menu.Button
			// className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '
			>
				<Sun
					className='flex text-black group-hover:text-white dark:hidden dark:text-white dark:group-hover:text-black '
					size={25}
				/>
				<SunMoon
					className='hidden text-white group-hover:text-black dark:flex'
					size={25}
				/>
			</Menu.Button>
			<Menu.Items>
				<Menu.Item>
					{({ active }) => (
						<div onClick={() => setTheme('light')} className={'cursor-pointer'}>
							light
						</div>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<div className={'cursor-pointer'} onClick={() => setTheme('dark')}>
							dark
						</div>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<div
							className={'cursor-pointer'}
							onClick={() => setTheme('system')}
						>
							System
						</div>
					)}
				</Menu.Item>
			</Menu.Items>
		</Menu>
	);
}
export default ThemeToggle;