import { useState, useEffect, useRef } from "react";
import './DetectView.css';

/**
 * Returns a div with a data attribute: [data-visible].
 * This reactive attribute changes depending on whether the 
 * component is visible (or not!).
 */
export default function DetectView(props) {
	const [isVisible, setVisible] = useState(true);
	const domRef = useRef();

	// https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
	useEffect(() => {
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
		<div {...{ "data-visible": isVisible }} {...!!props.className ? {className: props.className} : {}} ref={domRef}>
			{props.children}
		</div>
	);
}