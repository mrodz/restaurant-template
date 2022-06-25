import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

export default function NotFoundPage(): React.ReactElement {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(true);
	}, []);

	// const handleClick = () => {
	// 	setOpen(true);
	// };

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	return (
		<>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Page Not Found!
				</Alert>
			</Snackbar>
			<div>NOT FOUND!!!</div>
		</>
	);
}