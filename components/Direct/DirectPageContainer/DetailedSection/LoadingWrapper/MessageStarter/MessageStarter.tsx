import { Flex, Box, Text, Button, useMantineColorScheme } from '@mantine/core'
import { IconBrandMessenger } from '@tabler/icons-react'
import CustomButton from '../../../../../CustomButton/CustomButton'
import NewMessageModal from '../../../MessagesSection/NewMessageModal/NewMessageModal'
const MessageStarter = () => {
	const { colorScheme } = useMantineColorScheme()

	const dark = colorScheme === 'dark'

	return (
		<Flex direction='column' justify='center' align='center' gap='0'>
			<Box
				sx={{
					padding: 0,
					margin: 0,
					borderRadius: '50%',
					border: `2.5px solid ${dark ? 'white' : 'black'}`,

					width: 96,
					height: 96,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<IconBrandMessenger color={dark ? 'white' : 'black'} size={60} stroke={1.25}></IconBrandMessenger>
			</Box>
			<Text pt='sm' m={0} fz={20} fw={500} color={dark ? '#f5f5f5' : 'black'}>
				Your messages
			</Text>
			<Text pt='5px' m={0} color={dark ? '#a8a8a8' : '#737373'} fz={14}>
				Send private photos and messages to a friend or group
			</Text>
			<NewMessageModal>
				<CustomButton onClick={() => {}}>Send messages</CustomButton>
			</NewMessageModal>
		</Flex>
	)
}

export default MessageStarter
