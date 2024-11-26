import { Button, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'
interface RegularButtonProps {
	children: ReactNode
	errorVariant?: boolean
	onClick?: () => void
	disabled?: boolean
	isFirstButton?: boolean
}
const RegularButton = ({ children, errorVariant, onClick, disabled, isFirstButton }: RegularButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Button
			variant='outline'
			size='lg'
			color='gray'
			disabled={disabled}
			onClick={onClick}
			sx={{
				borderBottom: 0,
				borderLeft: 0,
				borderRight: 0,

				borderTop: isFirstButton ? '0px solid black' : `1px solid ${dark ? '#363636' : '#dbdbdb'}`,
				color: errorVariant ? '#ED4956' : dark ? '#f5f5f5' : 'black',
				fontSize: '14px',
				'&:disabled': {
					color: '#525251',
					borderTop: isFirstButton ? '0px solid black' : `1px solid ${dark ? '#363636' : '#dbdbdb'}`,
					backgroundColor: 'transparent',
				},

				'&:hover': {
					backgroundColor: 'transparent',
				},
			}}>
			{children}
		</Button>
	)
}

export default RegularButton
