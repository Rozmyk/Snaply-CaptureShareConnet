'use client'
import { useEffect, useState } from 'react'
import { IconHeart } from '@tabler/icons-react'
import { Indicator, useMantineColorScheme } from '@mantine/core'
import { useNotifications } from '../../../../../context/NotificationsContext'

const NotificationsIcon = () => {
	const { activeNotifications } = useNotifications()
	const [notificationsLength, setNotificationsLenght] = useState(0)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	useEffect(() => {
		setNotificationsLenght(activeNotifications.length)
	}, [activeNotifications])
	return (
		<Indicator
			inline
			size={16}
			processing={true}
			disabled={notificationsLength == 0}
			offset={2}
			label={notificationsLength}
			position='top-end'
			color='#FF3040'>
			<IconHeart stroke={1.75} size={28} color={!dark ? 'black' : 'white'} />
		</Indicator>
	)
}

export default NotificationsIcon
