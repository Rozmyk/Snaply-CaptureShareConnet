import { Box, Text, useMantineColorScheme } from '@mantine/core'

interface MessageTypeTextProps {
	isLoggedUserId: boolean
	content: string
	maxWidth: number
}

const MessageTypeText = ({ isLoggedUserId, content, maxWidth }: MessageTypeTextProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Box
			p='7px 12px'
			sx={{
				backgroundColor: isLoggedUserId ? (dark ? '#3797f0' : '#3697f1') : dark ? '#262626' : '#eeefee',
				borderRadius: '20px',
				maxWidth: maxWidth,
				overflowWrap: 'break-word',
			}}>
			<Text color={isLoggedUserId ? 'white' : dark ? 'white' : 'black'} fz={15}>
				{content}
			</Text>
		</Box>
	)
}

export default MessageTypeText
