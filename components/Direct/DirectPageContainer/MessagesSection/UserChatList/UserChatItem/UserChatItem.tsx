import { Flex, Avatar, Text, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import getTimeDifference from '../../../../../../utils/getTimeDifference'
import { useSession } from 'next-auth/react'
import { SingleMessageProps, UserProps } from '../../../../../../types'
interface UserChatItemProps {
	message: SingleMessageProps
	onClick: () => void
	active: boolean
	sender: string
	userData: UserProps
}
const UserChatItem = ({ message, onClick, active, sender, userData }: UserChatItemProps) => {
	const session = useSession()
	const userId = session?.data?.user?.id
	const maxLetterLength = 35
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const trimmedString =
		message.content_type == 'text' || (message.content_type == 'emoji' && message.content.length > maxLetterLength)
			? message.content.slice(0, maxLetterLength) + '...'
			: message.content

	return (
		<UnstyledButton
			onClick={onClick}
			sx={{
				backgroundColor: active ? (dark ? '#262626' : '#ffffff') : 'transparent',
				'&:hover': {
					backgroundColor: dark ? '#1b1a1b' : '#f2f2f2',
				},
			}}
			p='xs'>
			<Flex gap='sm'>
				<Avatar size={56} radius={'50%'} src={userData.image}></Avatar>
				<Flex direction='column' justify='center' align='flex-start'>
					<Text fw={500} fz='sm' color={dark ? 'white' : 'black'}>
						{userData.username}
					</Text>
					<Flex gap='5px' justify='flex-start' align='center'>
						<Text fz='xs' color={dark ? '#A8a8a8' : '#737373'}>
							{message.content_type === 'text' || message.content_type === 'emoji'
								? userId === sender
									? `You: ${trimmedString}`
									: trimmedString
								: userId === sender
								? 'You sent an attachment'
								: `${userData.username} sent an attachment`}
						</Text>

						<Text fz='xs' color={dark ? '#A8a8a8' : '#737373'}>
							·
						</Text>
						<Text fz='xs' color={dark ? '#A8a8a8' : '#737373'}>
							{getTimeDifference(message.createdAt)}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</UnstyledButton>
	)
}

export default UserChatItem
