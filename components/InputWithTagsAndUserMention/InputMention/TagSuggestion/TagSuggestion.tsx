import { Flex, Text } from '@mantine/core'

interface TagSuggestionProps {
	suggestion: {
		display: string
		id: string | number
		postLength: number
	}
	dark: boolean
}
const TagSuggestion = ({ suggestion, dark }: TagSuggestionProps) => {
	console.log(suggestion)
	return (
		<Flex direction='column'>
			<Text sx={{ maxWidth: 300, overflowWrap: 'break-word' }} color={dark ? 'gray.0' : 'gray.9'} fw={700} p={0} m={0}>
				#{suggestion.display}
			</Text>
			<Text fz='xs'>{`Posts: ${suggestion.postLength}`} </Text>
		</Flex>
	)
}

export default TagSuggestion
