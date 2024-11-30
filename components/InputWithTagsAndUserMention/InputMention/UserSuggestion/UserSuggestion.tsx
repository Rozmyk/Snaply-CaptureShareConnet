import { Flex, Text } from '@mantine/core'
import Image from 'next/image'
type suggestionProps = {
	id: string | number
	display?: string
}
interface UserSuggestionProps {
	suggestion: suggestionProps
	image: string | null
	name: string | null
	dark: boolean
}
const UserSuggestion = ({ suggestion, dark, name, image }: UserSuggestionProps) => [
	image && name && suggestion.display && (
		<div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 100000 }}>
			<Image
				src={image}
				alt={suggestion.display}
				width={30}
				height={30}
				style={{
					marginRight: '8px',
					borderRadius: '50%',
				}}
			/>
			<Flex direction='column'>
				<Text color={dark ? 'gray.0' : 'gray.9'} fz='sm' fw={700}>
					{suggestion.display}
				</Text>
				<Text fz='xs' color={dark ? '#a1a1a1' : 'black'}>
					{name}
				</Text>
			</Flex>
		</div>
	),
]

export default UserSuggestion
