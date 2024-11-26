import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import Image from 'next/image'
interface tagSuggestionProps {
	display: string
	postLength: number
	image: string
	name: string
}
const UserSuggestion = ({ display, image, name }: tagSuggestionProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<Image
				src={image}
				alt={display}
				style={{
					width: '30px',
					height: '30px',
					marginRight: '8px',
					borderRadius: '50%',
				}}
			/>
			<Flex direction='column'>
				<Text color={dark ? 'gray.0' : 'gray.9'} fz='sm' fw={700}>
					{display}
				</Text>
				<Text fz='xs'>{name}</Text>
			</Flex>
		</div>
	)
}

export default UserSuggestion
