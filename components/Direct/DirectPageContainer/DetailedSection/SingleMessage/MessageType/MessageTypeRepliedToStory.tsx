import { Text, Image, Flex, useMantineColorScheme, Box, Divider } from '@mantine/core'
import { IconClockHour10 } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
interface MessageTypeRepliedToStoryProps {
	content: string
	attachments: string
	senderId: string
	maxWidth: number
}
const MessageTypeRepliedToStory = ({ content, attachments, senderId, maxWidth }: MessageTypeRepliedToStoryProps) => {
	const session = useSession()
	const userId = session?.data?.user?.id
	const isCurrentUser = senderId == userId
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex direction='column' justify='center' align='flex-start' sx={{ maxWidth: maxWidth }}>
			<Text mb='xs' fz='xs' color={dark ? '#a8a8a8' : '#737373'} align={isCurrentUser ? 'right' : 'left'}>
				{isCurrentUser ? 'You reacted to their story' : 'Replied to your story'}
			</Text>
			<Flex direction={isCurrentUser ? 'row-reverse' : 'row'}>
				<Divider
					sx={{ borderRadius: '10px' }}
					ml='xs'
					mr='xs'
					color={dark ? '#232323' : '#dadbda'}
					size='xl'
					orientation='vertical'
				/>
				<Image src={attachments} width={100} radius='lg' alt='Replied message' height={200}></Image>
				{!isCurrentUser && (
					<Flex ml='md' mr='md' direction='column' justify='center' align='flex-start'>
						<IconClockHour10 color={dark ? '#a8a8a8' : '#737373'} stroke={1} size={40} />
						<Text fz='xs' color={dark ? '#a8a8a8' : '#737373'}>
							Only you can see this.
						</Text>
					</Flex>
				)}
			</Flex>
			<Box
				mt='xs'
				p='7px 12px'
				sx={{
					backgroundColor: isCurrentUser ? (dark ? '#3797f0' : '#3697f1') : dark ? '#262626' : '#eeefee',
					borderRadius: '20px',
				}}>
				<Text
					color={isCurrentUser ? 'white' : 'black'}
					fz={14}
					align={isCurrentUser ? 'right' : 'left'}
					sx={{ width: 'fit-content' }}>
					{content}
				</Text>
			</Box>
		</Flex>
	)
}

export default MessageTypeRepliedToStory
