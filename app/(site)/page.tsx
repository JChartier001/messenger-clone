'use client';

import { Button } from '@/app/components/ui/Button';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../components/ThemeToggle';


const WelcomePage = () => {
	const router = useRouter();

	return (
		<div>
			<h1>Welcome to farm2table</h1>
			<Button onClick={() => router.push('/farm')}>Farm</Button>
			<Button onClick={() => router.push('/store')}>Store</Button>
			<Button onClick={() => router.push('/customer')}>Customer</Button>
			
			<ThemeToggle />
		</div>
	);
};

export default WelcomePage;
