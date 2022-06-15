import { FC } from 'react';
import './AnimatedUnderline.css';

interface AnimatedUnderlineProps {
    /**
     * The colors of the underline; will form a gradient leading from `from` to `to`
     */
    colors: {
        from: string,
        to: string
    },
    /**
     * Required; it is the child elements.
     */
    children?: React.ReactNode
}

const AnimatedUnderline: FC<AnimatedUnderlineProps> = (props) => {
    const colorFrom = props.colors.from, colorTo = props.colors.to;

    return (
        <span className='fancy-underline' style={{ backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo}` }}>
            {props.children}
        </span>
    );
}

export default AnimatedUnderline;