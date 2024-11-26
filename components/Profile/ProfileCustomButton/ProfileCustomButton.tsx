import { Button, useMantineColorScheme } from '@mantine/core'
import { ReactNode } from 'react'
interface ProfileCustomButtonProps {
	children: ReactNode
	onClick: () => void
}
const ProfileCustomButton = ({ children, onClick, ...props }: ProfileCustomButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Button
			{...props}
			onClick={onClick}
			radius='md'
			sx={{
				color: dark ? '#f4f5e8' : '#2c1e0f',
				backgroundColor: dark ? '#363636' : '#efefef',
				'&:hover': {
					backgroundColor: dark ? '#262626' : '#dbdbdb',
				},
			}}>
			{children}
		</Button>
	)
}

export default ProfileCustomButton
