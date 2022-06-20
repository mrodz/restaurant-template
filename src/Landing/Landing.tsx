import React, { FC } from 'react';
import { RESTAURANT_NAME, RESTAURANT_DESCRIPTION } from '../RESTAURANT_CONFIG';
import boba from './pictures/boba.jpeg';
import ParallaxImageSplit from '../ParallaxImageSplit/ParallaxImageSplit';
import './Landing.scss';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { 
	Rating, 
	Zoom, 
	Divider, 
	/*Snackbar, 
	Alert,*/
	styled
} from '@mui/material';
import styles from '../designs.scss';

interface ReviewCardProps {
	rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
	reviewer: string,
	content: string,
	url: string,
	id: string
}

const LandingTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(() => ({
	[`& .${tooltipClasses.arrow}::before, & .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#E3DCD5',
		color: styles.fontColor,
		fontSize: 'unset'
	},
}));

const ReviewCard: FC<{ review: ReviewCardProps }> = (props) => {
	/*const [open, setOpen] = React.useState(false);
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};*/

	return (
		<div className="review-card">
			{/*<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
					View {props.review.reviewer.split(/\s+/)[0]}'s Review
				</Alert>
			</Snackbar>*/}
			<LandingTooltip title={`View ${props.review.reviewer.split(/\s/)[0]}'s Review`}
				placement='top'
				arrow
				TransitionComponent={Zoom}
				TransitionProps={{ timeout: 250 }}
			>
			<a href={props.review.url} target="_blank" rel="noopener noreferrer" /*onMouseEnter={() => setOpen(true)}*/>
				<div className="review-card-review">
					<Rating name="read-only" value={props.review.rating} readOnly />
				</div>
			</a>
			</LandingTooltip>
			<div className='review-card-info'>
				<div className='review-card-author'>
					{props.review.reviewer}
				</div>
				{props.review.content}
			</div>
		</div>
	);
}

/**
 * @todo DON'T ADD PERSONALIZED CONTENT HERE - it is a template. Instead,
 * maybe add squares like the ones on your portfolio website and splash text.
 * 
 * <h1> elements HAVE A PURPOSE!
 * 
 * @returns JSX 
 */
export default function Landing(): React.ReactElement {
	return (
		<div className='landing-page'>

			<div className='main-landing-intro'>
				<span data-discover-label>
					Discover
				</span>
				<span data-business-name-label>
					{RESTAURANT_NAME}
				</span>
				<span data-business-description-label>
					{RESTAURANT_DESCRIPTION}
				</span>
			</div>

			<div className='business-blurbs'>
				<div id="first">
					<div className='first-description'>
						<h1>
							Community
						</h1>
						<section>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</section>
					</div>
					<ParallaxImageSplit fileName={boba} alt="Boba" width="18rem" leading="L" />
				</div>

				<div id="second">
					<ParallaxImageSplit fileName={boba} alt="Boba" width="18rem" leading='R' />

					<div className='first-description'>
						<h1>
							Family-Owned
						</h1>
						<section>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</section>
					</div>
				</div>

				<div id="third">
					<div className='first-description'>
						<h1>
							Quality Products
						</h1>
						<section>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

						</section>
					</div>
					<ParallaxImageSplit fileName={boba} alt="Boba" width="18rem" leading="L" />
				</div>
			</div>

			<div className='business-mission-statement'>
				<h1>
					Mission Statement &mdash;
				</h1>
				<pre className='mission-statement-content'>
					<i className="fa-solid fa-quote-left"></i> To make tasty drinks for all
				</pre>
			</div>

			<Divider className='reviews-line'>
				Reviews
			</Divider>
			<div className='review-cards'>
				<ReviewCard review={{
					rating: 5,
					reviewer: 'Nancy Adzentoivich',
					content: 'Wide selection of food from bagels and pastries to boba, panini and ice cream.',
					url: 'https://goo.gl/maps/kw7ZiFJnp63HPLNq7',
					id: '1'
				}} />
				<ReviewCard review={{
					rating: 5,
					reviewer: 'Ethan Cochard',
					content: 'Love the service and friendly vibes from other customers and the staff.',
					url: 'https://goo.gl/maps/bY9WhKFM33gZLLx1A',
					id: '2'
				}} />
				<ReviewCard review={{
					rating: 5,
					reviewer: 'April Serrato',
					content: 'Awesome food, price is legit and coolest staff!!!!',
					url: 'https://goo.gl/maps/WevrSmRdny6Ei4pz9',
					id: '3'
				}} />
			</div>
			<Divider />
		</div>
	);
}