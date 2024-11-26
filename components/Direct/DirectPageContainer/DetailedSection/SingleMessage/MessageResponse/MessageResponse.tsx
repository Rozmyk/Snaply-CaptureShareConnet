import { Text, Flex, Divider, useMantineColorScheme } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import TextResponse from './ResponseType/TextResponse'
import PhotoResponse from './ResponseType/PhotoResponse'
import PostResponse from './ResponseType/PostResponse'
import EmojiResponse from './ResponseType/EmojiResponse'
import { fetchUserData } from '../../../../../../utils/user/fetchUserData'
import { UserProps, ReplyDataProps } from '../../../../../../types'
interface MessageResponseProps {
	isLoggedUserId: boolean
	replyInfo: ReplyDataProps
	maxWidth: number
}
const MessageResponse = ({ isLoggedUserId, replyInfo, maxWidth }: MessageResponseProps) => {
	const session = useSession()
	const username = session?.data?.user?.username
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const [responseUserData, setResponseUserData] = useState<UserProps | null>(null)

	useEffect(() => {
		const getUserData = async () => {
			let userData
			if (replyInfo) {
				userData = await fetchUserData(replyInfo.sender)
			}
			if (userData) {
				setResponseUserData(userData)
			}
		}
		getUserData()
	}, [replyInfo])
	const chooseComponentToRender = (replyInfo: ReplyDataProps) => {
		switch (replyInfo.messageType) {
			case 'text':
				return <TextResponse maxWidth={maxWidth} content={replyInfo.content} />
			case 'photo':
				return <PhotoResponse src={replyInfo.attachments} />
			case 'sharePost':
				return <PostResponse src={replyInfo.attachments} />
			case 'emoji':
				return <EmojiResponse content={replyInfo.content} />
			case 'repliedToStory':
				return <PhotoResponse src={replyInfo.attachments} />

			default:
				return null
		}
	}
	return (
		<>
			{responseUserData && (
				<>
					<Text mb='xs' fz='xs' color={dark ? '#a8a8a8' : '#737373'}>
						{`You replied to ${username == responseUserData.username ? 'yourself' : responseUserData.username}`}
					</Text>

					<Flex sx={{ cursor: 'pointer' }} mb='10px' direction={isLoggedUserId ? 'row' : 'row-reverse'}>
						{chooseComponentToRender(replyInfo)}

						<Divider
							sx={{ borderRadius: '10px' }}
							ml='xs'
							mr='xs'
							color={dark ? '#232323' : '#dadbda'}
							size='xl'
							orientation='vertical'
						/>
					</Flex>
				</>
			)}
		</>
	)
}

export default MessageResponse
