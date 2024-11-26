import { Text } from '@mantine/core'
interface EmojiResponseProps {
	content: string
}
const EmojiResponse = ({ content }: EmojiResponseProps) => {
	return (
		
			<Text fz={50}>{content}</Text>
		
	)
}

export default EmojiResponse
