import { Flex, Text } from '@mantine/core'

interface TagSuggestionProps {
	suggestion: {
		id: string | number
		display?: string
	}
	postLength: number | null
	dark: boolean
}

const TagSuggestion = ({ suggestion, dark, postLength }: TagSuggestionProps) => {
	return (
		<Flex direction='column'>
			<Text sx={{ maxWidth: 300, overflowWrap: 'break-word' }} color={dark ? 'gray.0' : 'gray.9'} fw={700} p={0} m={0}>
				{suggestion.display}
			</Text>
			{postLength && <Text fz='xs'>{`Posts: ${postLength}`}</Text>}
		</Flex>
	)
}

export default TagSuggestion
