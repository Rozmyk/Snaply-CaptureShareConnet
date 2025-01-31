import { Button } from '@mantine/core'
import { CSSProperties, ReactNode, MouseEvent } from 'react'

interface CustomButtonProps {
	children: ReactNode
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	submitType?: boolean
	style?: CSSProperties
	fullWidth?: boolean
}

const CustomButton = ({ children, onClick, disabled, submitType, fullWidth, style }: CustomButtonProps) => {
	return (
		<Button
			onClick={onClick}
			type={submitType ? 'submit' : 'button'}
			disabled={disabled}
			style={style}
			fullWidth={fullWidth}
			sx={{
				backgroundColor: '#0095f6',
				'&[data-disabled]': { opacity: 0.4, backgroundColor: '#0194f6', color: 'white' },
			}}
			radius='md'>
			{children}
		</Button>
	)
}

export default CustomButton
