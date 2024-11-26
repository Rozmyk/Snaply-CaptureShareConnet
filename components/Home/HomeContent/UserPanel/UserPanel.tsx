import { Flex, Avatar, Text, useMantineColorScheme, Anchor } from '@mantine/core'
import { useSession } from 'next-auth/react'
import SwitchAccount from '../../../SwitchAccount/SwitchAccount'

const UserPanel = () => {
	const session = useSession()
	const userImage = session?.data?.user?.image
	const name = session?.data?.user?.name
	const username = session?.data?.user?.username
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<>
			<Flex justify='space-between' align='center' mt='xl' mb='xl'>
				<Flex direction='row' justify={'flex-start'} align='center' gap='10px'>
					<Avatar sx={{ width: 44, height: 44, borderRadius: '50%' }} src={userImage}></Avatar>
					<Flex direction='column' gap={0} p={0} m={0}>
						<Text fz={14} fw={600} m={0} p={0} color={dark ? 'white' : '#f5f5f'}>
							{username}
						</Text>
						<Text c={dark ? '#a8a8a8' : '#737373'} fz={14} m={0} p={0}>
							{name}
						</Text>
					</Flex>
				</Flex>

				<SwitchAccount>
					<Anchor color='#0095f6' fw={700} fz={12}>
						Switch
					</Anchor>
				</SwitchAccount>
			</Flex>
		</>
	)
}

export default UserPanel
