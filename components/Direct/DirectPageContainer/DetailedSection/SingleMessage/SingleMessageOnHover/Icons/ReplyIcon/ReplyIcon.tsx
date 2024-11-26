'use client'
import { useState, useEffect } from 'react'
import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconCornerUpLeft } from '@tabler/icons-react'
import { Dispatch, SetStateAction } from 'react'
import { ReplyDataProps, SingleMessageProps } from '../../../../../../../../types'
import { fetchUserData } from '../../../../../../../../utils/user/fetchUserData'

interface ReplyIconProps {
	message: SingleMessageProps
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
}
const ReplyIcon = ({ setReplyToUser, message }: ReplyIconProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const [username, setUsername] = useState<string | null>(null)
	useEffect(() => {
		const getSenderUsername = async () => {
			const data = await fetchUserData(message.sender)
			if (data) {
				setUsername(data.username)
			}
		}
		getSenderUsername()
	}, [message])

	return (
		<ActionIcon
			size='md'
			onClick={() => {
				if (message.id) {
					setReplyToUser({
						isReplyToMessage: true,
						content: message.content_type == 'emoji' || message.content_type == 'text' ? message.content : 'attachment',
						messageType: message.content_type,
						sender: message.sender,
						username: username !== null ? username : '',
						messageId: message.id,
						attachments: message.attachments ? message.attachments : null,
					})
				}
			}}>
			<IconCornerUpLeft style={{ color: dark ? 'white' : '#000101' }} size='1.125rem' />
		</ActionIcon>
	)
}

export default ReplyIcon
