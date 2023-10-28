'use client'

import { toast, Toaster, ToastBar } from 'react-hot-toast';

const ToasterContext = () => {
  return (
		<Toaster
			toastOptions={{
				success: {
					style: {
						background: 'green',
						color: 'white',
					},
				},
				error: {
					style: {
						background: 'red',
						color: 'white',
					},
				},
			}}
		/>
		
	);
}

export default ToasterContext;