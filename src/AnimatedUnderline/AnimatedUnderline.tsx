import { CSSProperties, FC } from 'react';
import './AnimatedUnderline.css';

/**
 * Props for {@link AnimatedUnderline}
 */
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
    children: React.ReactNode,
    style?: React.CSSProperties,
    className?: string
    
}

/**
 * This component was inspired by a YouTube short.
 * 
 * Draws a line, spanning from Left to Right, underneath a component.
 * Also supports a gradient!
 * 
 * @param props {@link AnimatedUnderlineProps}
 * @returns JSX
 */
const AnimatedUnderline: FC<AnimatedUnderlineProps> = (props) => {
    const colorFrom = props.colors.from, colorTo = props.colors.to;

    // Add the underline effect to the inline style.
    const style: CSSProperties = (() => {
       let x: CSSProperties = props?.style ?? {};
        x.backgroundImage = `linear-gradient(90deg, ${colorFrom}, ${colorTo})`;
        return x;
    })();

    return (
        <span style={style} className={'fancy-underline ' + (props?.className ?? '')}>
            {props.children}
            
        </span>
    );
}

export default AnimatedUnderline;