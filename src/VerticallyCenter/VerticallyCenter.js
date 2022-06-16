import './VerticallyCenter.css';

/**
 * @deprecated - not functional
 * @param {*} props child components
 * @returns JSX to vertically center elements.
 */
export default function VerticallyCenter(props) {
    return (
        <div className='vertically-center-container'>
            <div className='vertically-center-child'>
                {props.children}
            </div>
        </div>
    );
}