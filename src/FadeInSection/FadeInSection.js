import React from "react";
import './FadeInSection.css';

// https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
export default function FadeInSection(props) {
	const [isVisible, setVisible] = React.useState(true);
	const domRef = React.useRef();

	React.useEffect(() => {
		const cleanUp = domRef.current;

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				setVisible(entry.isIntersecting);
			});
		});
		observer.observe(cleanUp);
		return () => observer.unobserve(cleanUp);
	}, []);

	return (
		<div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
			{props.children}
		</div>
	);
}