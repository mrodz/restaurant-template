import React, { CSSProperties, FC, useState } from 'react';
import { RESTAURANT_NAME, RESTAURANT_DESCRIPTION } from '../RESTAURANT_CONFIG';
import boba from './pictures/boba.jpeg';
import ParallaxImageSplit from '../ParallaxImageSplit/ParallaxImageSplit';
import './Landing.scss';

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

			<div className='business-blurbs'>
				<div id="first">
					<div className='first-description'>
						Section #1
					</div>
					<ParallaxImageSplit fileName={boba} alt="Boba" width="18rem" leading="L" />
				</div>

				<div id="second">
					<ParallaxImageSplit fileName={boba} alt="Boba" width="18rem" leading='R' />

					<div className='first-description'>
						Section #2
					</div>
				</div>

				<div id="third">
					<div className='first-description'>
						Section #3
					</div>
					<ParallaxImageSplit fileName={boba} alt="Boba" width="18rem" leading="L"/>

				</div>
			</div>
		</div>
	);
}