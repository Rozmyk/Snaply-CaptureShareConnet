'use client'
import { Container } from '@mantine/core'

import NotificationsContent from '../NotificationsContent/NotificationsContent'

const NotificationsContainer = () => {
	return (
		<Container p='xs'>
			<NotificationsContent withText={false} />
		</Container>
	)
}

export default NotificationsContainer
