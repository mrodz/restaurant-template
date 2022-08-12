import { useState, FC } from 'react';
import {
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Button,
	Box,
	Paper,
	styled,
	StepConnector,
	stepConnectorClasses,
	StepIconProps,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@mui/material';
import Check from '@mui/icons-material/Check';
import './ProductPicker.sass';
import { styles } from '../..';

export interface MenuItem {
	name: string,
	description: string,
	price: string,
	tags: string[]
}

export interface Menu {
	coffee: MenuItem[],
	boba: MenuItem[],
	smoothie: MenuItem[],
	tea: MenuItem[],
	pastries: MenuItem[],
	snacks: MenuItem[]
}

const MENU_MAPPED: Menu = require('../../MENU_MAPPED.json');

/**
 * {
 *	string[]: string[]
 * }
 */
let cached = {};

interface MenuItemCard {
	item: MenuItem;
}

const MenuItemCard: FC<MenuItemCard> = (props) => {
	return (
		<div className='product-card'>
			<div className='product-card-name'>{props.item.name}</div>
			<div className='product-card-description'>{props.item.description}</div>
		</div>
	);
}

/**
 * Check if an array has all the elements of another array.
 * I believe this algorithm runs in O of n + log(n) time.
 * 
 * Example:
 * 
 * arrayContains(['a', 'b', 'c'], ['b', 'c'])      // true
 * 
 * arrayContains(['a', 'b', 'c'], ['c', 'b', 'a']) // true
 * 
 * arrayContains(['a', 'b', 'c'], ['a', 'b', 'x']) // false
 *
 * @param array0 the source array
 * @param array1 the items being searched for
 * @returns Whether the first array contains all the elements in the second array
 */
function arrayContains<T>(array0: T[], array1: T[]): boolean {
	// once an element is found, its index is stored here to skip checking it in future iterations.
	let indexesToSkip = new Set<number>();

	for (let i = 0, len0 = array0.length; i < len0; i++) {
		for (let j = 0, len1 = array1.length; j < len1; j++) {
			if (indexesToSkip.has(j) || array0[i] !== array1[j]) continue;

			indexesToSkip.add(j);

			const foundAllElements = indexesToSkip.size === len1;
			if (foundAllElements) return true;
		}
	}

	return false;
}

const TopicsOfInterest = (choices: string[]) => {
	if (choices[choices.length - 1] === null) choices.pop();

	const mappingFunction = (element: MenuItem, index: number) => <MenuItemCard key={index} item={element} />

	if ((choices as any) in cached) {
		return <div className='product-cards'>
			{/* @ts-ignore */}
			{cached[choices].map(mappingFunction)}
		</div>;
	}

	let results: MenuItem[] = [];

	for (const key in MENU_MAPPED) {
		for (const item of MENU_MAPPED[key as keyof typeof MENU_MAPPED]) {
			if (arrayContains(item.tags, choices)) {
				results.push(item);
			}
		}
	}

	const found = results.length !== 0;

	//@ts-ignore
	if (found) cached[choices] = results;

	return <>
		{(() => {
			if (found) return <div className='product-cards'>{results.map(mappingFunction)}</div>;
			return <>Sorry, I couldn't find any products under {choices[0]} and {choices[1]}</>
		})()}
	</>
}

const steps: {
	label: string,
	description: (choices: string[]) => string[] | JSX.Element,
	allowPassthrough?: boolean
}[] = [
		{
			label: 'First off, are you feeling hungry, or thirsty?',
			description: (_) => ['Hungry', 'Thirsty']
		},
		{
			label: 'Okay, choose which of these fits your taste the most',
			description: (choices) => {
				switch (choices[0]) {
					case 'hungry':
						return ['Sweet', 'Salty'];
					case 'thirsty':
						return ['Boba', 'Tea', 'Coffee', 'Something else...'];
					default:
						return [`No choice mapped for ${choices[0]}`];
				}
			}
		},
		{
			label: 'Confirm',
			description: (choices) => (
				<span>Continue to find products to {choices[0] === 'hungry' ? 'satiate' : 'quench'} your <b>{choices[0] === 'hungry' ? 'hunger' : 'thirst'}</b> (specifically <b>{choices[1]}</b>)</span>
			),
			allowPassthrough: true
		},
	];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: styles.primaryColor,
		},
	},

	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: styles.primaryColor,
		},
	},
	[`&.${stepConnectorClasses.line}`]: {
		borderColor: '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1,
	},

}));

const CustomCircleRoot = styled('div')<{ ownerState: { active?: boolean } }>(
	({ theme, ownerState }) => ({
		color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
		display: 'flex',
		height: 22,
		alignItems: 'center',
		...(ownerState.active && {
			color: styles.popColor,
		}),
		'& .CustomCircleRoot-completedIcon': {
			color: styles.primaryColor,
			zIndex: 1,
			fontSize: '1.2rem',
		},
		'& .CustomCircleRoot-circle': {
			width: '1rem',
			height: '1rem',
			// borderRadius: '50%',
			backgroundColor: 'currentColor',
		},
	}),
);

const CustomCircle = (props: StepIconProps) => {
	const { active, completed, className } = props;

	return (
		<CustomCircleRoot ownerState={{ active }} className={className}>
			{completed ? (
				<Check className="CustomCircleRoot-completedIcon" />
			) : (
				<div className="CustomCircleRoot-circle" />
			)}
		</CustomCircleRoot>
	);
}

export default function ProductPicker(): JSX.Element {
	const [activeStep, setActiveStep] = useState(0);
	const [choices, setChoices] = useState<string[]>([]);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const CustomStepContent = (props: {
		index: number,
		options: string[] | JSX.Element,
		allowPassthrough?: boolean
	}) => {
		const [value, setValue] = useState<null | string>(null);

		return (
			<StepContent>
				<FormControl>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setValue((event.target as HTMLInputElement).value); }}
					>
						{
							props.options instanceof Array
								? props.options.map((e, i) => <FormControlLabel value={e.toLowerCase()} control={<Radio />} label={e} key={i} />)
								: props.options
						}
					</RadioGroup>
				</FormControl>
				<Box sx={{ mb: 2 }}>
					<div>
						<Button
							variant="text"
							{...(!props.allowPassthrough && { disabled: value === null })}
							onClick={() => {
								handleNext();
								let copy: string[] = Array.from(choices);
								copy.push(value as string);
								setChoices(copy);
							}}
							sx={{ mt: 1, mr: 1 }}
						>
							{props.index === steps.length - 1 ? 'Submit Query' : 'Continue'}
						</Button>
						<Button
							variant="text"
							disabled={props.index === 0}
							onClick={() => {
								handleBack();
								let copy: string[] = Array.from(choices);
								copy.pop();
								setChoices(copy);
							}}
							sx={{ mt: 1, mr: 1 }}
						>
							Back
						</Button>
					</div>
				</Box>
			</StepContent>
		);
	}

	return (
		<div className='product-picker-main'>
			<Stepper activeStep={activeStep} connector={<CustomConnector />} orientation="vertical" sx={{
				height: 'min-content'
			}}>
				{steps.map((step, index) => (
					<Step key={index}>
						<StepLabel
							optional={
								index === steps.length - 1 ? (
									<>Last Step</>
								) : null
							}

							StepIconComponent={CustomCircle}
						>
							<span className='product-picker-step-title'>
								{step.label}
							</span>
						</StepLabel>
						<CustomStepContent options={step.description(choices)} allowPassthrough={step.allowPassthrough} index={index} />
					</Step>
				))}
				<>
					{
						activeStep === steps.length &&
						<Button sx={{ marginTop: 1, marginRight: 1 }} onClick={() => {
							handleReset()
							setChoices([])
						}}>
							Reset
						</Button>
					}
				</>
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} sx={{ p: 3, width: "fit-content" }}>
					All steps completed! Here&apos;s what I found:
					<br />

					{TopicsOfInterest(choices)}

					<br />
				</Paper>
			)}
		</div>
	);
}