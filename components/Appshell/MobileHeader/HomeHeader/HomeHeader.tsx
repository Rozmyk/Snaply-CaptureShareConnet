import { Box, Flex } from '@mantine/core'
import SwitchContent from './SwitchContent/SwitchContent'
import CreatePost from '../../Sidebar/common/CreatePost/CreatePost'
import NotificationsButton from '../../Sidebar/NotificationsButton/NotificationsButton'
import { useRouter } from 'next/navigation'

const HomeHeader = () => {
	const router = useRouter()
	return (
		<Box
			p='xs'
			h='100%'
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			<SwitchContent />
			<Flex>
				<CreatePost variant='tablet' />
				<NotificationsButton
					sidebarStatus={false}
					onClick={() => {
						router.push('/notifications')
					}}
					variant='tablet'
				/>
			</Flex>
		</Box>
	)
}

export default HomeHeader
