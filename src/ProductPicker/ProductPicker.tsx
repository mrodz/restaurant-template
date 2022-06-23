import { useEffect, useState } from 'react';
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
import styles from '../designs.scss';

export interface MenuItem {
	name: string,
	description: string,
	price: string,
	tags: string[]
}

const MENU_MAPPED: {
	coffee: MenuItem[],
	boba: MenuItem[],
	smoothie: MenuItem[],
	tea: MenuItem[],
	pastries: MenuItem[],
	snacks: MenuItem[]
} = require('../MENU_MAPPED.json');


let cached = {};

const TopicsOfInterest = (choices: string[]) => {
	if ((choices as any) in cached) {
		return <span>
			{/*@ts-ignore*/}
			{cached[choices].map((e, i) => <div key={i}>{e.name}</div>)}
		</span>;
	}

	let results: MenuItem[] = [];

	for (const key in MENU_MAPPED) {
		for (const item of MENU_MAPPED[key as keyof typeof MENU_MAPPED]) {
			console.log(item.name, item.tags, choices);

			if (item.tags.includes(choices[0]) && item.tags.includes(choices[1])) {
				results.push(item);
			}
		}
	}

	const found = results.length !== 0;

	if (found) {
		//@ts-ignore
		cached[choices] = results;
	}

	return <span>
		{(() => {
			if (found) return results.map((e, i) => <div key={i}>{e.name}</div>)
			return <>Sorry, I couldn't find any products under {choices[0]} and {choices[1]}</>
		})()}
	</span>
}

const steps: {
	label: string,
	description: (choice: string[]) => string[] | JSX.Element,
	allowPassthrough?: boolean
}[] = [
		{
			label: 'First off, are you feeling hungry, or thirsty?',
			description: (_) => ['Hungry', 'Thirsty']
		},
		{
			label: 'Okay, choose which of these fits your taste the most',
			description: (choice) => {
				switch (choice[0]) {
					case 'hungry':
						return ['Sweet', 'Salty'];
					case 'thirsty':
						return ['Boba', 'Tea', 'Coffee', 'Something else...'];
					default:
						return [`No choice mapped for ${choice}`];
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
		{
			label: 'Review Findings',
			description: (choice) => TopicsOfInterest(choice),
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

	useEffect(() => {
		console.log(choices);
	}, [choices]);

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
						aria-labelledby="demo-radio-buttons-group-label"
						name="radio-buttons-group"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setValue((event.target as HTMLInputElement).value);
						}}
					>

						{(props.options instanceof Array)
							? props.options.map((e, i) => {
								return <FormControlLabel value={(() => {
									try {
										return e.toLowerCase();
									} catch (e) {
										return e; // should never happen
									}
								})()} control={<Radio />} label={e} key={i} />
							})
							: props.options
						}
					</RadioGroup>
				</FormControl>
				<Box sx={{ mb: 2 }}>
					<div>
						<Button
							variant="text"
							{
								...(() => {
									if (props.allowPassthrough) {
										return {}
									} else {
										return {disabled: value === null}
									}
								})()
							}
							onClick={() => {
								handleNext();
								let copy = Array.from(choices);
								copy.push(value as string);
								setChoices(copy);
							}}
							sx={{ mt: 1, mr: 1 }}
						>
							{props.index === steps.length - 1 ? 'Finish' : 'Continue'}
						</Button>
						<Button
							variant="text"
							disabled={props.index === 0}
							onClick={() => {
								handleBack();
								let copy = Array.from(choices);
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
			<Box>
				<Stepper activeStep={activeStep} connector={<CustomConnector />} orientation="vertical">
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
				</Stepper>
				{activeStep === steps.length && (
					<Paper square elevation={0} sx={{ p: 3 }}>
						All steps completed - you&apos;re finished<br />
						<Button onClick={() => {
							handleReset();
							setChoices([]);
						}} sx={{ mt: 1, mr: 1 }}>
							Reset
						</Button>
					</Paper>
				)}
			</Box>
		</div>
	);
}