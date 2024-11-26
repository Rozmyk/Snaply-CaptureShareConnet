import { useMantineColorScheme, Button } from '@mantine/core'
interface SingleListItemProps {
	isLastItem?: boolean
	onClick?: () => void
	centerText: string
	disabled?: boolean
}
const SingleListItem = ({ isLastItem, onClick, centerText, disabled }: SingleListItemProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Button
			onClick={onClick}
			size='lg'
			disabled={disabled}
			sx={{
				fontSize: 14,
				textTransform: 'capitalize',
				fontWeight: 400,
				color: dark ? 'white' : 'black',
				backgroundColor: 'transparent',
				borderBottom: isLastItem ? 'none' : `1px solid  ${dark ? '#373736' : '#dbdbdb'} `,
				'&:hover': {
					backgroundColor: 'transparent',
				},
				'&[data-disabled]': {
					color: dark ? 'white' : 'black',
					opacity: 0.2,
					fontWeight: 400,
					borderBottom: isLastItem ? 'none' : '1px solid #373736 ',
				},
			}}>
			{centerText}
		</Button>
	)
}

export default SingleListItem
