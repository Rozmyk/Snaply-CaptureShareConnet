import { Flex, Avatar, Text, Group, Tooltip, ActionIcon } from '@mantine/core'
import { IconPhone, IconVideo, IconInfoCircle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { UserProps } from '../../../../../../../types'
interface DetailedHeaderDesktopProps {
	activeUser: UserProps
	dark: boolean
}
const DetailedHeaderDesktop = ({ activeUser, dark }: DetailedHeaderDesktopProps) => {
	const router = useRouter()
	const redirectToProfile = () => {
		router.push(`/profile/${activeUser.username}`)
	}
	return (
		<>
			<Flex justify='flex-start' align='center' gap='xs'>
				<Avatar
					onClick={redirectToProfile}
					sx={{ cursor: 'pointer' }}
					size={44}
					radius='55%'
					src={activeUser.image}></Avatar>
				<Text sx={{ cursor: 'pointer', color: dark ? 'white' : 'black' }} onClick={redirectToProfile} fw={600}>
					{activeUser.username}
				</Text>
			</Flex>
			<Group>
				<Tooltip label='The option is currently unavailable.'>
					<ActionIcon>
						<IconPhone style={{ color: dark ? 'white' : 'black' }} />
					</ActionIcon>
				</Tooltip>
				<Tooltip label='The option is currently unavailable.'>
					<ActionIcon>
						<IconVideo style={{ color: dark ? 'white' : 'black' }} />
					</ActionIcon>
				</Tooltip>
				<Tooltip label='The option is currently unavailable.'>
					<ActionIcon>
						<IconInfoCircle style={{ color: dark ? 'white' : 'black' }} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</>
	)
}

export default DetailedHeaderDesktop
