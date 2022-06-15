import './VerticallyCenter.css';

export default function VerticallyCenter(props) {
    return (
        <div className='vertically-center-container'>
            <div className='vertically-center-child'>
                {props.children}
            </div>
        </div>
    );
}