
import AuthForm from './components/AuthForm';

export default function Home() {
	return (
		<div className='flex min-h-full flex-col justify-center align-center py-12 sm:px-6 lg:px-8'>
			<div>
				<div className="hidden m-auto h-[300px] w-[450px] bg-[url('/images/logo.png')] bg-cover dark:bg-[url('/images/dark_logo.png')] dark:bg-contain bg-no-repeat sm:flex " />
				<div className="h-[200px]  m-auto w-[200px] bg-[url('/images/mobile_logo.png')] bg-cover dark:bg-[url('/images/mobile_dark_logo.png')] dark:bg-cover sm:hidden" />
				<h2 className='mt-6 text-center text-3xl font-bold tracking-tight'>
					Sign in to your account
				</h2>
			</div>
			<AuthForm />
		</div>
	);
}
