import { Text } from '@mantine/core'
interface MessageTypeEmojisProps {
	content: string
}
const MessageTypeEmojis = ({ content }: MessageTypeEmojisProps) => {
	return <Text size={50}> {content} </Text>
}

export default MessageTypeEmojis
