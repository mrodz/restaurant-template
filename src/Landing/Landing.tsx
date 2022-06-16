import React from 'react';
import './Landing.css';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export default function Landing(): React.ReactElement {
	return (
		<ParallaxProvider>
			
			<div style={{ minHeight: '1000px' }}>
				<Parallax speed={-500}>
					<div className="slow" >
						Slow
					</div>
				</Parallax>
				<Parallax speed={5}>
					<div className="fast" > 
						Fast!
					</div>
				</Parallax>
			</div>
		</ParallaxProvider>
	);
}