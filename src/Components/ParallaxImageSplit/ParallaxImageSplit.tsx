import { string } from 'prop-types';
import React, { useState, FC, CSSProperties, useEffect } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import './ParallaxImageSplit.scss';
import styles from '../../designs.scss';
import { onWindowResize } from '../..';

/**
 * Denotes which half of the image you're referring to: L(eft) or R(ight).
 */
export type dir = 'L' | 'R';

interface ParallaxImageSplitProps {
	/**
	 * the path to image to be loaded here.
	 * obtain using:
	 * import %VARIABLE_NAME% from "%RELATIVE_FILE_PATH%";
	 */
	fileName: string,
	/**
	 * Add alternate text to the images.
	 * 
	 * If {@link string[]} is provided, will assign [0] to the left
	 * and [1] to the right.
	 * 
	 * If {@link string} is provided, wil assign "Left " + string 
	 * to the left and "Right " + string to the right.
	 */
	alt: string[] | string,
	/**
	 * Which half of the image should fly by at the quickest rate.
	 * Defaults to the Left Side when constructing a .
	 */
	leading?: dir,

	/**
	 * Set the speeds at which each half will move.
	 */
	speeds?: {
		/**
		 * Denoted by the leading property.
		 * Defaults to +100
		 */
		leading: number,
		/**
		 * The opposite of leading.
		 * Defaults to -100
		 */
		lagging: number
	},
	className?: string
}

/**
 * Allows the supplying of a width parameter, but not a height.
 * 
 * Sets the width of the container/rendering of the original image
 */
interface ParallaxImageSplitPropsWidth extends ParallaxImageSplitProps {
	width?: string | (() => string)
}

/**
 * Allows the supplying of a height parameter, but not a width.
 * 
 * Sets the height of the container/rendering of the original image
 */
interface ParallaxImageSplitPropsHeight extends ParallaxImageSplitProps {
	height?: string | (() => string)
}

/**
 * Component that accepts an image, splits it in half, and applies the 
 * parallax effect to each part. The final effect is one image whose halves,
 * when scrolled, slide apart from each other rather aesthetically.
 * 
 * CSS Selector: [data-parallax-image-split]
 * 
 * @author Mateo
 * @param props {@link ParallaxImageSplitProps} plus either a width or height (not both!)
 * @returns JSX.
 */
const ParallaxImageSplit: FC<ParallaxImageSplitPropsWidth | ParallaxImageSplitPropsHeight> = React.memo((props) => {
	// need to use states because it takes time to get the images' dimensions.
	const [leftProduct, setLeftProduct] = useState('');
	const [rightProduct, setRightProduct] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [dim, setDim] = useState(window.screen.width);

	// console.log(window.screen.width);
	useEffect(() => {
		onWindowResize(() => {
			setDim(window.screen.width);
		})
	}, [])

	let img = new Image();
	img.src = props.fileName;

	img.onload = async () => {
		async function createCanvas(placement: dir) {
			const canvas = document.createElement('canvas');

			canvas.width = img.width / 2;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');

			// to get rid of typescript warnings.
			if (ctx === null) throw new Error("this will never be thrown");

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.imageSmoothingQuality = 'high';

			// if left, start at the origin; if right, start midway through.
			const start = placement === 'L' ? 0 : img.width / 2;

			// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			ctx.drawImage(img, start, 0, img.width, img.height, 0, 0, img.width, img.height);

			// Converting to base64
			const base64Image = canvas.toDataURL('image/jpeg');
			(placement === 'L' ? setLeftProduct : setRightProduct)(base64Image);
			return base64Image;
		}

		await createCanvas('L');
		await createCanvas('R');

		setLoaded(true);
	};

	const leading = (props?.leading ?? 'L') === 'L';

	const speeds = props?.speeds ?? {
		leading: dim > styles.switchToMobileView ? +100 : +50,
		lagging: dim > styles.switchToMobileView ? -100 : -50
	}

	const prefixAlt = (prefix: string): string => Array.isArray(props.alt) ? props.alt[0] : prefix + props.alt;
	const speed = (l: boolean) => l ? speeds.leading : speeds.lagging;

	return (
		<>
			<ParallaxProvider>
				<div className={'parallax-image-wrapper-1 ' + (props?.className ?? '')} data-parallax-image-split>
					<div className='parallax-image-wrapper'>
						<Parallax speed={speed(leading)}>
							<img data-fade-first className='parallax-image' src={leftProduct} loading='lazy' alt={prefixAlt('Left')} /*style={style}*/ />
						</Parallax>
						<Parallax speed={speed(!leading)}>
							<img data-fade-second className='parallax-image' src={rightProduct} loading='lazy' alt={prefixAlt('Right')} /*style={style}*/ />
						</Parallax>
					</div>
				</div>
			</ParallaxProvider>
		</>
	);
});

export default ParallaxImageSplit;