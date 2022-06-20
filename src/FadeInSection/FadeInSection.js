import React from "react";
import './FadeInSection.css';

export default function FadeInSection(props) {
	const [isVisible, setVisible] = React.useState(true);
	const domRef = React.useRef();

	React.useEffect(() => {
	  const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// alert('you crossed paths!');
			}
			setVisible(entry.isIntersecting);
		});
	  });
	  observer.observe(domRef.current);
	  return () => observer.unobserve(domRef.current);
	}, []);

	return (
	  <div
		className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
		ref={domRef}
	  >
		{props.children}
	  </div>
	);
  }