import { Flex, Text, Button, Avatar, useMantineColorScheme } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { UserProps } from '../../../../../../../types'
interface FreshChatProps {
	activeUser: UserProps
}
const FreshChat = ({ activeUser }: FreshChatProps) => {
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Flex direction='column' justify='center' align='center' gap='none' mt='lg'>
			<Avatar mb='sm' size={96} radius='50%' src={activeUser.image}></Avatar>
			<Text fz={20} fw={600} color={dark ? 'white' : 'black'}>
				{activeUser.name}
			</Text>
			<Text color={dark ? '#a8a8a8' : '#737373'} fz='sm'>
				{activeUser.username} · snaply
			</Text>
			<Button
				mt={15}
				mb={32}
				onClick={() => {
					router.push(`/profile/${activeUser.username}`)
				}}
				sx={{
					backgroundColor: dark ? '#363636' : '#eeefee',
					borderRadius: '10px',
					fontWeight: 600,
					color: dark ? '' : 'black',
					'&:hover': {
						backgroundColor: dark ? '#272726' : '#dadadb',
					},
				}}>
				Show profile
			</Button>
		</Flex>
	)
}

export default FreshChat
