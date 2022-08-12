import React, { FC, ReactElement, useContext } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import {
	Rating,
	Zoom,
	Divider,
	styled
} from '@mui/material';
import { RESTAURANT_NAME, RESTAURANT_DESCRIPTION, LOREM_IPSUM } from '../../RESTAURANT_CONFIG';
import ParallaxImageSplit from '../../components/ParallaxImageSplit';
import DetectView from '../../components/DetectView/DetectView';
import boba from './pictures/boba.jpeg';
import reviews from './reviews.json';
import './Landing.sass';
import { AppDimensionContext, AppDimensionProvider, styles } from '../..';

type rating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5

interface ReviewCardProps {
	rating: rating,
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

interface ParallaxImageTextSectionProps {
	even?: boolean,
	image: React.ReactElement,
	title: string,
	content: string,
	id?: number
}

function ParallaxImageTextSection(props: ParallaxImageTextSectionProps) {
	const components = [
		(
			<div className='first-description' key={0}>
				<div>
					<h1>
						{props.title}
					</h1>
					<section>
						{props.content}
					</section>
				</div>
			</div>
		),
		(
			<div className='text-section-image' key={1}>
				<>
					{props.image}
				</>
			</div>
		)
	];

	let dim = useContext(AppDimensionContext)
	let fin: ReactElement[] = [...components];

	// if the device is not mobile, select every "even" element
	// and reverse the order (to fit with the grid columns).
	if (props?.even === false && dim.width > styles.switchToMobileView) {
		fin[0] = components[1];
		fin[1] = components[0];
	}

	return (
		<div {...!props?.even && { "data-even": true }}>
			{fin}
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
function LandingInternal(): React.ReactElement {
	type blurb = {
		parallaxImageURL: string,
		title: string,
		description: string,
		parallaxImageAlt: string
	}

	const blurbs: blurb[] = [
		{
			parallaxImageURL: boba,
			parallaxImageAlt: "Boba",
			title: "Community",
			description: LOREM_IPSUM
		},
		{
			parallaxImageURL: boba,
			parallaxImageAlt: "Boba",
			title: "Family-Owned",
			description: LOREM_IPSUM
		},
		{
			parallaxImageURL: boba,
			parallaxImageAlt: "Boba",
			title: "Quality Products",
			description: LOREM_IPSUM
		}
	];

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
				{
					blurbs.map((blurb, index) => <ParallaxImageTextSection id={index} image={
						<ParallaxImageSplit fileName={blurb.parallaxImageURL} alt={blurb.parallaxImageAlt} leading={index % 2 === 0 ? 'L' : 'R'} />
					} title={blurb.title} content={blurb.description} even={index % 2 === 0} key={index} />)
				}
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
						{reviews.map((r, i) =>
							<ReviewCard key={i} review={{ ...r, rating: r.rating as rating }} />
						)}
					</div>
				</DetectView>
				<Divider />
			</section>

			<section className='landing-side-margins landing-more-info'>
				<p>
					{LOREM_IPSUM}
				</p>
				<br />
				<p>
					{LOREM_IPSUM}
				</p>
			</section>

			<section>

			</section>

			{/*
				TODO: 
				 - add dates to reviews
				 - google maps embed
				 - thank patrons who supported over covid (?)
				 - get more inspo from other restaurant websites. 
			*/}
		</div>
	);
}

export default function Landing() {
	return (
		<AppDimensionProvider>
			<LandingInternal />
		</AppDimensionProvider>
	)
}