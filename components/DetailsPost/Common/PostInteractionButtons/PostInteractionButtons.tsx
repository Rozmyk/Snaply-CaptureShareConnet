'use client'
import { Box, Group, Tooltip, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconMessageCircle, IconSend } from '@tabler/icons-react'
import { checkIfUserLikedPost } from '../../../../utils/post/checkIfUserLikedPost'
import { checkIfUserSavedPost } from '../../../../utils/post/checkIfUserSavedPost'
import { useState, useEffect } from 'react'
import SharePost from '../../../SharePost/SharePost'
import { PostProps } from '../../../../types'
import LikeButton from './LikeButton/LikeButton'
import SaveButton from './SaveButton/SaveButton'
interface PostInteractionButtonsProps {
	userId: string
	postData: PostProps
	addedBy: string
	postId: string
}
const PostInteractionButtons = ({ userId, postData, addedBy, postId }: PostInteractionButtonsProps) => {
	const [userLiked, setUserLiked] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	console.log(postId)

	useEffect(() => {
		const fetchData = async () => {
			if (userId && postId) {
				setUserLiked(await checkIfUserLikedPost(userId, postId))
				setIsSaved(await checkIfUserSavedPost(userId, postId))
			}
		}

		fetchData()
	}, [postId, userId])

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
			}}>
			<Group spacing='none'>
				<LikeButton
					setUserLiked={setUserLiked}
					userLiked={userLiked}
					userId={userId}
					postId={postId}
					addedBy={addedBy}
					postImage={postData.image}
				/>
				<Tooltip label='Comment' position='bottom-end'>
					<ActionIcon size='lg'>
						<IconMessageCircle color={dark ? '#f5f5f5' : 'black'} />
					</ActionIcon>
				</Tooltip>
				<Tooltip label='Send' position='bottom-end'>
					<SharePost postId={postId}>
						<ActionIcon size='lg'>
							<IconSend color={dark ? '#f5f5f5' : 'black'} />
						</ActionIcon>
					</SharePost>
				</Tooltip>
			</Group>
			<SaveButton isSaved={isSaved} setIsSaved={setIsSaved} dark={dark} userId={userId} postId={postId} />
		</Box>
	)
}

export default PostInteractionButtons
