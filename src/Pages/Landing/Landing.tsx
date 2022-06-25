import React, { FC } from 'react';
import { RESTAURANT_NAME, RESTAURANT_DESCRIPTION } from '../../RESTAURANT_CONFIG';
import boba from './pictures/boba.jpeg';
import ParallaxImageSplit from '../../components/ParallaxImageSplit/ParallaxImageSplit';
import './Landing.sass';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import {
	Rating,
	Zoom,
	Divider,
	styled
} from '@mui/material';
import styles from '../../designs.scss';
import DetectView from '../../components/DetectView/DetectView';

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
	// set the color of the tooltip
	[`& .${tooltipClasses.arrow}::before, & .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#E3DCD5',
		color: styles.fontColor,
		fontSize: 'unset'
	},
}));

const ReviewCard: FC<{ review: ReviewCardProps }> = (props) => {
	return (
		<div className="review-card">
			<LandingTooltip title={`View ${props.review.reviewer.length > 0 ? props.review.reviewer.split(/\s/)[0] + '\'s ' : ''}Review`}
				placement='top'
				arrow
				TransitionComponent={Zoom}
				TransitionProps={{ timeout: 250 }}
			>
				<a href={props.review.url} target="_blank" rel="noopener noreferrer">
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

			<section className='main-landing-intro landing-side-margins'>
				<span data-discover-label>
					Discover
				</span>
				<span data-business-name-label>
					{RESTAURANT_NAME}
				</span>
				<span data-business-description-label>
					{RESTAURANT_DESCRIPTION}
				</span>
			</section>

			<section className='business-blurbs'>
				<div id="first">
					<div className='first-description'>
						<h1>
							Community
						</h1>
						<section>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
							culpa qui officia deserunt mollit anim id est laborum.
						</section>
					</div>
					<ParallaxImageSplit fileName={boba} alt="Boba" width="36rem" leading="L" />
				</div>

				<div id="second">
					<ParallaxImageSplit fileName={boba} alt="Boba" width="36rem" leading='R' />

					<div className='first-description'>
						<h1>
							Family-Owned
						</h1>
						<section>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
							culpa qui officia deserunt mollit anim id est laborum.
						</section>
					</div>
				</div>

				<div id="third">
					<div className='first-description'>
						<h1>
							Quality Products
						</h1>
						<section>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
							culpa qui officia deserunt mollit anim id est laborum.
						</section>
					</div>
					<ParallaxImageSplit fileName={boba} alt="Boba" width="36rem" leading="L" />
				</div>
			</section>

			<section className='business-mission-statement landing-side-margins'>
				<h1>
					Mission Statement &mdash;
				</h1>
				<pre className='mission-statement-content'>
					<i className="fa-solid fa-quote-left"></i> To make tasty drinks for all
				</pre>
			</section>

			<section className='review-section'>
				<Divider className='reviews-line'>
					Reviews
				</Divider>
				<DetectView>
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
				</DetectView>
				<Divider />
			</section>

			<section className='landing-side-margins landing-more-info'>
				{/* <FadeInSection> */}
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Convallis aenean et tortor at risus viverra
					adipiscing at. Facilisi cras fermentum odio eu. Sit amet
					nulla facilisi morbi tempus iaculis urna. Tempor id eu nisl
					nunc mi ipsum faucibus vitae. Interdum consectetur libero id
					faucibus nisl tincidunt eget. Elit duis tristique
					sollicitudin nibh sit amet. Diam maecenas sed enim ut sem
					viverra aliquet. Adipiscing bibendum est ultricies integer.
					Commodo quis imperdiet massa tincidunt nunc. Quam
					pellentesque nec nam aliquam sem. Imperdiet dui accumsan
					sit amet. Proin libero nunc consequat interdum varius sit
					amet. Lorem donec massa sapien faucibus et molestie ac.
				</p>
				{/* </FadeInSection> */}
				<br />
				{/* <FadeInSection> */}
				<p>
					Massa enim nec dui nunc mattis enim ut tellus. Faucibus
					interdum posuere lorem ipsum dolor sit amet. Scelerisque
					varius morbi enim nunc faucibus a pellentesque. Iaculis
					nunc sed augue lacus. Nisl suscipit adipiscing bibendum
					est ultricies integer quis auctor. Id consectetur purus ut
					faucibus pulvinar elementum integer. Dolor sit amet
					consectetur adipiscing elit pellentesque habitant morbi
					tristique. Pulvinar elementum integer enim neque volutpat
					ac tincidunt vitae. Blandit aliquam etiam erat velit
					scelerisque in. Ultricies mi eget mauris pharetra et
					ultrices. Vitae nunc sed velit dignissim sodales ut eu
					sem. Sem et tortor consequat id porta nibh venenatis.
					Viverra mauris in aliquam sem fringilla ut morbi tincidunt.
					Convallis tellus id interdum velit laoreet id donec. Lacus
					viverra vitae congue eu. Sed nisi lacus sed viverra tellus
					in hac habitasse. Sed id semper risus in. Sit amet volutpat
					consequat mauris.
				</p>
				{/* </FadeInSection> */}
			</section>

			

			{/*
				TODO: 
				 - add dates to reviews
				 - google maps embed
				 - thank patrons who supported over covid (?)
				 - get more inspo from other restaurant websites. 

				DON'T CODE TOO MUCH ON 6/20 --> you have a lot of fucking homework to jump on. :(
			*/}
		</div>
	);
}