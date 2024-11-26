import { Box, Text, useMantineColorScheme } from '@mantine/core'
interface TextResponseProps {
	content: string
	maxWidth: number
}
const TextResponse = ({ content, maxWidth }: TextResponseProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Box
			p='8px 12px'
			sx={{
				backgroundColor: dark ? '#262626' : '#eeefee',
				borderRadius: '20px',
				maxWidth: maxWidth,
				overflowWrap: 'break-word',
			}}>
			<Text fz={14}>{content}</Text>
		</Box>
	)
}

export default TextResponse
