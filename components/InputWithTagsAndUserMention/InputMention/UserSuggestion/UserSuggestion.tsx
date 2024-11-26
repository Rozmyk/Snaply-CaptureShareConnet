import { Flex, Text } from '@mantine/core'
import Image from 'next/image'
type suggestionProps = {
	image: string
	display: string
	name: string
}
interface UserSuggestionProps {
	suggestion: suggestionProps
	dark: boolean
}
const UserSuggestion = ({ suggestion, dark }: UserSuggestionProps) => (
	<div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 100000 }}>
		<Image
			src={suggestion.image}
			alt={suggestion.display}
			width={0}
			height={0}
			style={{
				width: '30px',
				height: '30px',
				marginRight: '8px',
				borderRadius: '50%',
			}}
		/>
		<Flex direction='column'>
			<Text color={dark ? 'gray.0' : 'gray.9'} fz='sm' fw={700}>
				{suggestion.display}
			</Text>
			<Text fz='xs' color={dark ? '#a1a1a1' : 'black'}>
				{suggestion.name}
			</Text>
		</Flex>
	</div>
)

export default UserSuggestion
