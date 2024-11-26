import { Flex, Button } from '@mantine/core'
import { UserProps } from '../../../../../../types'
interface ChatButtonProps {
	redirectToChat: (userId: string) => void
	selectedUsers: UserProps[]
}
const ChatButton = ({ redirectToChat, selectedUsers }: ChatButtonProps) => {
	return (
		<Flex p='md' direction='column'>
			<Button
				onClick={() => {
					redirectToChat(selectedUsers[0].id)
				}}
				sx={{
					backgroundColor: '#0494f4',
					'&[data-disabled]': {
						backgroundColor: '#0494f4',
						opacity: 0.4,
						color: 'white',
					},
				}}
				radius='md'
				disabled={selectedUsers.length <= 0}
				fullWidth>
				Chat
			</Button>
		</Flex>
	)
}

export default ChatButton
