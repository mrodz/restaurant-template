import React, { CSSProperties, FC, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { RESTAURANT_NAME, RESTAURANT_DESCRIPTION } from '../RESTAURANT_CONFIG';
import boba from './pictures/boba.jpeg';
import './Landing.scss';

interface ParallaxImageSplitProps {
	fileName: string,
	alt: string[] | string,
}

interface ParallaxImageSplitPropsWidth extends ParallaxImageSplitProps {
	width?: string
}

interface ParallaxImageSplitPropsHeight extends ParallaxImageSplitProps {
	height?: string
}

const ParallaxImageSplit: FC<ParallaxImageSplitPropsWidth | ParallaxImageSplitPropsHeight> = (props) => {
	const [leftProduct, setLeftProduct] = useState('');
	const [rightProduct, setRightProduct] = useState('');

	let result: number[] = [0, 0];

	var img = new Image();
	img.src = props.fileName;

	img.onload = function () {
		result[0] = img.width;
		result[1] = img.height;

		function createCanvas(placement: 'l' | 'r') {
			const canvas = document.createElement('canvas');

			canvas.width = img.width / 2;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');
			if (ctx === null) throw new Error();

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.imageSmoothingQuality = 'high';

			ctx.drawImage(
				img,
				placement === 'l' ? 0 : img.width / 2,
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
			(placement === 'l' ? setLeftProduct : setRightProduct)(base64Image);
		}

		createCanvas('l');
		createCanvas('r');
	};

	const style: CSSProperties = {
		maxWidth: ('width' in props && props?.width !== undefined) ? `calc(${props.width} / 2)` : 'unset',
		maxHeight: ('height' in props && props?.height !== undefined) ? `calc(${props.height} / 2)` : 'unset'

	}

	return (
		<ParallaxProvider>
			<div className='parralax-image-wrapper'>
				<Parallax speed={100}>
					<img src={leftProduct} loading='lazy' alt={Array.isArray(props.alt) ? props.alt[0] : 'Left' + props.alt} style={style} />
				</Parallax>
				<Parallax speed={-100}>
					<img src={rightProduct} loading='lazy' alt={Array.isArray(props.alt) ? props.alt[1] : 'Right' + props.alt} style={style} />
				</Parallax>
			</div>
		</ParallaxProvider>
	);

}

export default function Landing(): React.ReactElement {

	return (
		<div>
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

			<ParallaxImageSplit fileName={boba} alt="Boba" width="40vw" />
			Cool Shit :)
		</div>
	);
}