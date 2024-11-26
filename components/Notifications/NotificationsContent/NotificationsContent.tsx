'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, Box, ScrollArea, useMantineColorScheme } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import LikedYourPost from './NotificationsType/LikedYourPost/LikedYourPost'
import CommentedYourPost from './NotificationsType/CommentedYourPost/CommentedYourPost'
import RequestForFollow from './NotificationsType/RequestForFollow/RequestForFollow'
import FollowedYou from './NotificationsType/FollowedYou/FollowedYou'
import MentionedInComment from './NotificationsType/MentionedInComment/MentionedInComment'
import RepliedToComment from './NotificationsType/RepliedToComment/RepliedToComment'
import NotificationsLoading from './NotificationsLoading/NotificationsLoading'
import { useNotifications } from '../../../context/NotificationsContext'
import EmptyNotifications from './EmptyNotifications/EmptyNotifications'
import sortAndGroupByDate from './SortAndGroupByDate'
import { updatedNotificationsProps } from '../../../types'
interface NotificationsContentProps {
	areaHeight?: number
	withText: boolean
}
interface groupedNotificationsProps {
	older: [] | updatedNotificationsProps[]
	thisMonth: [] | updatedNotificationsProps[]
	thisWeek: [] | updatedNotificationsProps[]
	thisYear: [] | updatedNotificationsProps[]
	today: [] | updatedNotificationsProps[]
	yesterday: [] | updatedNotificationsProps[]
}

const NotificationsContent = ({ areaHeight, withText }: NotificationsContentProps) => {
	const { notificationsData } = useNotifications() as { notificationsData: updatedNotificationsProps[] }
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const { ref, height } = useElementSize()
	const [groupedNotifications, setGroupedNotifications] = useState<groupedNotificationsProps>({
		older: [],
		thisMonth: [],
		thisWeek: [],
		thisYear: [],
		today: [],
		yesterday: [],
	})
	const [loading, setLoading] = useState(true)

	const chooseComponentToRender = (notification: updatedNotificationsProps) => {
		switch (notification.type) {
			case 'likePost':
				return <LikedYourPost key={notification.id} {...notification}></LikedYourPost>

			case 'followUser':
				return <FollowedYou key={notification.id} {...notification}></FollowedYou>

			case 'requestFollow':
				return <RequestForFollow key={notification.id} {...notification}></RequestForFollow>
			case 'commentedYourPost':
				return <CommentedYourPost key={notification.id} {...notification} />
			case 'mentionedInComment':
				return <MentionedInComment key={notification.id} {...notification} />
			case 'repliedToComment':
				return <RepliedToComment key={notification.id} {...notification} />
			default:
				return null
		}
	}
	useEffect(() => {
		const groupedData = sortAndGroupByDate(notificationsData)
		setGroupedNotifications(groupedData)
		setLoading(false)
	}, [notificationsData])
	useEffect(() => {
		sortAndGroupByDate(notificationsData)
	}, [notificationsData])

	return (
		<Flex direction='column' h='100%'>
			{withText && (
				<div ref={ref}>
					<Flex justify='space-between' align='center' p='lg'>
						<Text fz={24} fw={700} color={dark ? 'white' : 'black'}>
							Notifications
						</Text>
					</Flex>
				</div>
			)}
			{notificationsData.length <= 0 ? (
				<EmptyNotifications />
			) : (
				<ScrollArea pl='sm' pr='sm' h={areaHeight ? areaHeight - height : '100%'} type='never'>
					{loading || areaHeight == 0 ? (
						<NotificationsLoading />
					) : (
						<>
							{groupedNotifications.today.length > 0 && (
								<Box mb='xl'>
									<Text mb='sm' fw={700} color={dark ? 'white' : 'black'}>
										Today
									</Text>
									{groupedNotifications.today
										.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
										.map(notification => {
											return chooseComponentToRender(notification)
										})}
								</Box>
							)}

							{groupedNotifications.yesterday.length > 0 && (
								<Box mb='xl'>
									<Text mb='sm' fw={700} color={dark ? 'white' : 'black'}>
										Yesterday
									</Text>
									{groupedNotifications.yesterday
										.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
										.map(notification => {
											return chooseComponentToRender(notification)
										})}
								</Box>
							)}
							{groupedNotifications.thisWeek.length > 0 && (
								<Box mb='xl'>
									<Text mb='sm' fw={700} color={dark ? 'white' : 'black'}>
										This Week
									</Text>
									{groupedNotifications.thisWeek
										.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
										.map(notification => {
											return chooseComponentToRender(notification)
										})}
								</Box>
							)}
							{groupedNotifications.thisMonth.length > 0 && (
								<Box mb='xl'>
									<Text mb='sm' fw={700} color={dark ? 'white' : 'black'}>
										This Month
									</Text>
									{groupedNotifications.thisMonth
										.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
										.map(notification => {
											return chooseComponentToRender(notification)
										})}
								</Box>
							)}
							{groupedNotifications.thisYear.length > 0 && (
								<Box mb='xl'>
									<Text mb='sm' fw={700} color={dark ? 'white' : 'black'}>
										This year
									</Text>
									{groupedNotifications.thisYear
										.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
										.map(notification => {
											return chooseComponentToRender(notification)
										})}
								</Box>
							)}
							{groupedNotifications.older.length > 0 && (
								<Box mb='xl'>
									<Text mb='sm' fw={700} color={dark ? 'white' : 'black'}>
										Older
									</Text>
									{groupedNotifications.older
										.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
										.map(notification => {
											return chooseComponentToRender(notification)
										})}
								</Box>
							)}
						</>
					)}
				</ScrollArea>
			)}
		</Flex>
	)
}

export default NotificationsContent
