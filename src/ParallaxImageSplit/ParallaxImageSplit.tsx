import { useState, FC, CSSProperties } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import './ParallaxImageSplit.scss';

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
		 * The converse to leading.
		 * Defaults to -100
		 */
		lagging: number
	}
}

/**
 * Allows the supplying of a width parameter, but not a height.
 */
interface ParallaxImageSplitPropsWidth extends ParallaxImageSplitProps {
	width?: string
}

/**
 * Allows the supplying of a height parameter, but not a width.
 */
interface ParallaxImageSplitPropsHeight extends ParallaxImageSplitProps {
	height?: string
}

/**
 * Component that accepts an image, splits it in half, and applies the 
 * parallax effect to each part. The final effect is one image whose halves,
 * when scrolled, slide apart from eachother rather aesthetically.
 * 
 * @author Mateo
 * @param props {@link ParallaxImageSplitProps} plus either a width or height (not both!)
 * @returns JSX.
 */
const ParallaxImageSplit: FC<ParallaxImageSplitPropsWidth | ParallaxImageSplitPropsHeight> = (props) => {
	const [leftProduct, setLeftProduct] = useState('');
	const [rightProduct, setRightProduct] = useState('');

	let img = new Image();
	img.src = props.fileName;

	img.onload = () => {
		function createCanvas(placement: dir) {
			const canvas = document.createElement('canvas');

			canvas.width = img.width / 2;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');
			if (ctx === null) throw new Error();

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.imageSmoothingQuality = 'high';

			ctx.drawImage(
				img,
				placement === 'L' ? 0 : img.width / 2,
				0,
				img.width,
				img.height,
				0,
				0,
				img.width,
				img.height,
			);

			// Converting to base64
			const base64Image = canvas.toDataURL('image/jpeg');
			(placement === 'L' ? setLeftProduct : setRightProduct)(base64Image);
		}

		createCanvas('L');
		createCanvas('R');
	};

	const style: CSSProperties = {
		maxWidth: ('width' in props && props?.width !== undefined) ? props.width : 'unset',
		maxHeight: ('height' in props && props?.height !== undefined) ? props.height : 'unset'
	}

	const leading = (props?.leading ?? 'L') === 'L';
	const speeds = props?.speeds ?? {
		leading: +100,
		lagging: -100
	}

	return (
		<ParallaxProvider>
			<div className='parralax-image-wrapper'>
				<Parallax speed={leading ? speeds.leading : speeds.lagging}>
					<img src={leftProduct} loading='lazy' alt={Array.isArray(props.alt) ? props.alt[0] : 'Left' + props.alt} style={style} />
				</Parallax>
				<Parallax speed={!(leading) ? speeds.leading : speeds.lagging}>
					<img src={rightProduct} loading='lazy' alt={Array.isArray(props.alt) ? props.alt[1] : 'Right' + props.alt} style={style} />
				</Parallax>
			</div>
		</ParallaxProvider>
	);
}

export default ParallaxImageSplit;