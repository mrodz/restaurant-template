import React, { FC } from 'react'
import './Important.scss'

interface ImportantProps {
	children: React.ReactNode | React.ReactNode[] | string | undefined,
	weight?: weight,
	className?: string
};

export type weight = 1 | 2 | 3 | 4 | 5 | 6;

const Important: FC<ImportantProps> = (props) => {
	let weight = props?.weight ?? 0;

	if (Array.isArray(props.children) && props.children.length > 0) {
		return <span className={`important-text ${props?.className ?? ''}`} data-important-weight={weight}>{props.children}</span>
	} else if (props.children !== undefined) {
		return <span className={`important-text ${props?.className ?? ''}`} data-important-weight={weight}>{props.children}</span>
	}

	throw new Error("There is nothing to emphasize!");	
}

export default Important;