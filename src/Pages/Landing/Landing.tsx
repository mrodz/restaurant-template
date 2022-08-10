import React, { FC, ReactElement, useEffect, useState } from 'react';
import { RESTAURANT_NAME, RESTAURANT_DESCRIPTION, LOREM_IPSUM } from '../../RESTAURANT_CONFIG';
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
import { onWindowResize } from '../..';

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

const lvar = function <T>(arg: T, name = 'unkown') {
	console.trace(`${name} = ${arg}`);
	return arg;
}

interface ParallaxImageTextSectionProps {
	even?: boolean,
	image: React.ReactElement,
	title: string,
	content: string,
	id?: number
}

function xor(a: boolean, b: boolean) {
	return (a || b) && !(a && b)
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

	const [mobile, setMobile] = useState(document.body.clientWidth <= styles.switchToMobileView);

	useEffect(() => {
		onWindowResize((d) => {
			if (!mobile && d.width <= styles.switchToMobileView) {
				setMobile(true)
			} else if (mobile && d.width > styles.switchToMobileView) {
				setMobile(false)
			}
		})
	}, [])

	let fin: ReactElement[] = [...components];

	// if the device is not mobile, select every "even" element.
	if (!mobile && !props?.even) {
		fin[0] = components[1];
		fin[1] = components[0];
	}

	return (
		<div {...!props?.even && { "data-even": true }}>
			{fin}
		</div>
	);
}

/*
const PARALLAX_IMAGE_WIDTH = () => {
	let width = window.screen.width / 50;

	console.log(width);
	
	return width;
}
*/

/**
 * @todo DON'T ADD PERSONALIZED CONTENT HERE - it is a template. Instead,
 * maybe add squares like the ones on your portfolio website and splash text.
 * 
 * <h1> elements HAVE A PURPOSE!
 * 
 * FUCK the boba shit doesn't work
 * 
 * @returns JSX 
 */
export default function Landing(): React.ReactElement {

	// todo tomorrow - useState() to create reactive variable for screen width,
	// 				   pass this to the child ParallaxImageSplit function.
	// Maybe this works????

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

	/**
	const parallaxImageSplitBuilder = (fileName: any, alt: any, width: any, leading: any): ParallaxImage => {
		return (
			<ParallaxImageSplit fileName={fileName} alt={alt} width={width} leading={leading}/>
		) as unknown as ParallaxImage;
	}
	*/

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

				DON'T CODE TOO MUCH ON 6/20 --> you have a lot of fucking homework to jump on. :(
			*/}
		</div>
	);
}