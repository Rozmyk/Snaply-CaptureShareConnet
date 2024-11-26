'use client'
import { useState } from 'react'
import { Box, Group, Tooltip, ActionIcon, Text } from '@mantine/core'
import { IconHeartFilled, IconHeart, IconMessageCircle, IconSend, IconBookmark } from '@tabler/icons-react'
import getTimeDifference from '../../../utils/getTimeDifference'
import Likes from '../../Likes/Likes'
import { Timestamp } from 'firebase/firestore'
const ActionButtons = ({ timestamp, likes }: { timestamp: Timestamp; likes: string[] }) => {
	console.log(likes)
	const [isLiked, setIsLiked] = useState(false)
	return (
		<>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} pt='sm'>
				<Group spacing='none'>
					<Tooltip label='Like' position='bottom-end'>
						{isLiked ? (
							<ActionIcon
								size='xl'
								onClick={() => {
									setIsLiked(!isLiked)
								}}>
								<IconHeartFilled style={{ color: '#ff3141' }}></IconHeartFilled>
							</ActionIcon>
						) : (
							<ActionIcon
								size='xl'
								onClick={() => {
									setIsLiked(!isLiked)
								}}>
								<IconHeart></IconHeart>
							</ActionIcon>
						)}
					</Tooltip>
					<Tooltip label='Comment' position='bottom-end'>
						<ActionIcon size='xl'>
							<IconMessageCircle />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Send' position='bottom-end'>
						<ActionIcon size='xl'>
							<IconSend />
						</ActionIcon>
					</Tooltip>
				</Group>
				<Tooltip label='Save' position='bottom-end'>
					<ActionIcon size='xl'>
						<IconBookmark />
					</ActionIcon>
				</Tooltip>
			</Box>
			<Likes isGray={false} likes={likes}></Likes>
			<Text color='#737373' fz='sm'>
				{timestamp ? getTimeDifference(timestamp) : ''}
			</Text>
		</>
	)
}

export default ActionButtons
