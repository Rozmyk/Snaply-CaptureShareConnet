'use client'
import { Flex, Avatar, Text, Box, useMantineColorScheme } from '@mantine/core'
import Link from 'next/link'
import { useEffect } from 'react'
import { toggleViewedNotification } from '../../../../../utils/notifications/toggleViewedNotification'
import getTimeDifference from '../../../../../utils/getTimeDifference'
import { useSession } from 'next-auth/react'
import { updatedNotificationsProps } from '../../../../../types'

const LikedYourPhoto = ({ createdAt, options, user, viewed, id }: updatedNotificationsProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const session = useSession()
	const userId = session?.data?.user?.id
	const post = options.post
	useEffect(() => {
		if (!viewed && id && userId) {
			toggleViewedNotification(id, userId)
		}
	}, [id, userId, viewed])
	return (
		<Link href={`/post/${post.postId}`} style={{ textDecoration: 'none' }}>
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
				<Avatar radius={'50%'} size={44} src={user.image}></Avatar>
				<Box sx={{ width: '100%' }}>
					<Text fw={400} size={14} align='left'>
						<span style={{ fontWeight: '700' }}>{`${user.username} `}</span>
						liked your photo.
						<br />
						<span style={{ color: dark ? '#A8A8A8' : '#737373' }}> {getTimeDifference(createdAt)}</span>
					</Text>
				</Box>
				<Avatar size={44} src={post.postImage}></Avatar>
			</Flex>
		</Link>
	)
}

export default LikedYourPhoto
