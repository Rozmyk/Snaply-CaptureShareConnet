import { Button, useMantineColorScheme } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'

interface CustomButtonTransparentProps {
	children: ReactNode
	onClick: () => void
	disabled?: boolean
	fullWidth?: boolean
	style?: CSSProperties
}

const CustomButtonTransparent = ({
	children,
	onClick,
	disabled = false,
	fullWidth = false,
	style = {},
}: CustomButtonTransparentProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Button
			onClick={onClick}
			fullWidth={fullWidth}
			disabled={disabled}
			style={style}
			fw={500}
			sx={{
				backgroundColor: 'transparent',
				color: '#0095f6',

				'&:hover': { backgroundColor: 'transparent', color: dark ? 'white' : '#194978' },
				'&[data-disabled]': {
					color: '#a8a8a8',
					backgroundColor: 'transparent',
				},
			}}
			radius='md'
			type='submit'>
			{children}
		</Button>
	)
}

export default CustomButtonTransparent
