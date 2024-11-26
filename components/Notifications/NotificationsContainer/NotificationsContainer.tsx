'use client'
import { Container } from '@mantine/core'
import SuggestedForYou from '../NotificationsContent/EmptyNotifications/SuggestedForYou/SuggestedForYou'
import NotificationsContent from '../NotificationsContent/NotificationsContent'

const NotificationsContainer = () => {
	return (
		<Container p='xs'>
			<NotificationsContent withText={false} />
			<SuggestedForYou />
		</Container>
	)
}

export default NotificationsContainer
