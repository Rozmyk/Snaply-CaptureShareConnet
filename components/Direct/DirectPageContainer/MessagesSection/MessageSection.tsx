import { Flex, Text, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconFilePencil } from '@tabler/icons-react'
import NewMessageModal from './NewMessageModal/NewMessageModal'
import UserChatList from './UserChatList/UserChatList'
import SwitchAccountButton from './SwitchAccountButton/SwitchAccountButton'
import { useElementSize } from '@mantine/hooks'
import { useParams } from 'next/navigation'
import { ScrollArea } from '@mantine/core'

const MessageSection = () => {
	const params = useParams<{ chatId: string }>()
	const { colorScheme } = useMantineColorScheme()
	const { ref: headerRef, height: headerHeight } = useElementSize()

	const dark = colorScheme === 'dark'
	return (
		<>
			<Flex direction='column' gap='sm' justify='center' align='flex-start' p='lg'>
				<Flex w='100%' justify='space-between' align='center' ref={headerRef}>
					<SwitchAccountButton />
					<NewMessageModal>
						<ActionIcon size='xl'>
							<IconFilePencil color={dark ? '#f5f5f5' : 'black'} size={28} stroke={1.5}></IconFilePencil>
						</ActionIcon>
					</NewMessageModal>
				</Flex>
				<Text fw={700} color={dark ? 'white' : 'black'}>
					Messages
				</Text>
			</Flex>
			<ScrollArea h={`calc(100vh - ${headerHeight}px - 100px)`}>
				<UserChatList chatId={params.chatId} />
			</ScrollArea>
		</>
	)
}

export default MessageSection
