import { ActionIcon, Avatar, Flex, Text } from '@mantine/core'
import { IconArrowLeft, IconInfoCircle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { UserProps } from '../../../../../../../types'
interface DetailedHeaderMobileProps {
	activeUser: UserProps
	dark: boolean
}
const DetailedHeaderMobile = ({ activeUser, dark }: DetailedHeaderMobileProps) => {
	const router = useRouter()
	const handleRedirect = () => {
		router.push('/direct')
	}
	const redirectToProfile = () => {
		router.push(`/profile/${activeUser.username}`)
	}
	return (
		<>
			<Flex justify='center' align='center' gap='xs'>
				<ActionIcon onClick={handleRedirect}>
					<IconArrowLeft style={{ color: dark ? 'white' : 'black' }} />
				</ActionIcon>
				<Avatar onClick={redirectToProfile} size={24} radius='50%' src={activeUser.image} />
				<Text color={dark ? 'white' : 'black'} onClick={redirectToProfile} fz={16}>
					{activeUser.username}
				</Text>
			</Flex>
			<ActionIcon>
				<IconInfoCircle style={{ color: dark ? 'white' : 'black' }} />
			</ActionIcon>
		</>
	)
}

export default DetailedHeaderMobile
