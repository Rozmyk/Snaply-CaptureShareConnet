import SingleNotificationLoading from './SingleNotificationLoading/SingleNotificationLoading'
import { Flex } from '@mantine/core'
const NotificationsLoading = () => {
	return (
		<Flex direction='column' justify='flex-start' align='center' gap='sm'>
			<SingleNotificationLoading />
			<SingleNotificationLoading />
			<SingleNotificationLoading />
			<SingleNotificationLoading />
		</Flex>
	)
}

export default NotificationsLoading
