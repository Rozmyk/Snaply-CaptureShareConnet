'use client'
import { useEffect } from 'react'
import { Flex, Avatar, Text, Box, useMantineColorScheme } from '@mantine/core'
import { toggleViewedNotification } from '../../../../../utils/notifications/toggleViewedNotification'
import Link from 'next/link'
import getTimeDifference from '../../../../../utils/getTimeDifference'
import { useSession } from 'next-auth/react'
import { updatedNotificationsProps } from '../../../../../types'

const CommentedYourPost = ({ user, options, createdAt, id, viewed }: updatedNotificationsProps) => {
	const { colorScheme } = useMantineColorScheme()
	const session = useSession()
	const userId = session?.data?.user?.id
	const dark = colorScheme === 'dark'
	useEffect(() => {
		if (!viewed && userId) {
			toggleViewedNotification(id, userId)
		}
	}, [viewed, userId, id])
	return (
		<Link href={`/post/${options.post.postId}`} style={{ textDecoration: 'none' }}>
			<Flex
				pt='xs'
				pb='xs'
				sx={{
					'&:hover': {
						backgroundColor: dark ? '#121313' : '#fafbfb',
					},
					textDecoration: 'none',
					color: dark ? 'white' : 'black',
				}}
				justify='space-between'
				align='center'
				gap='xs'>
				<Avatar size={44} radius={'50%'} src={user.image}></Avatar>
				<Box sx={{ width: '100%' }}>
					<Text fw={400} size={14} align='left'>
						<span style={{ fontWeight: '700' }}>{`${user.username} `}</span>
						commented: {options.content}
						<br />
						<span style={{ color: dark ? '#A8A8A8' : '#737373' }}> {getTimeDifference(createdAt)}</span>
					</Text>
				</Box>
				<Avatar size={44} src={options.post.postImage}></Avatar>
			</Flex>
		</Link>
	)
}

export default CommentedYourPost
