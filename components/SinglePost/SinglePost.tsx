'use client'
import { Container, Divider, useMantineColorScheme } from '@mantine/core'
import { useState, useEffect } from 'react'
import Likes from '../Likes/Likes'
import HiddenLikes from '../Likes/HiddenLikes/HiddenLikes'
import { useSession } from 'next-auth/react'
import { likePost } from '../../utils/post/likePost'
import { unlikePost } from '../../utils/post/unlikePost'
import PostHeader from './PostHeader/PostHeader'
import PostContent from './PostContent/PostContent'
import PostAction from './PostAction/PostAction'
import PostComments from './PostComments/PostComments'
import PostDescription from './PostDescription/PostDescription'
import { fetchUserData } from '../../utils/user/fetchUserData'
import { checkIfUserSavedPost } from '../../utils/post/checkIfUserSavedPost'
import { checkIfUserLikedPost } from '../../utils/post/checkIfUserLikedPost'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '@/app/firebase'
import SinglePostLoading from './SinglePostLoading/SinglePostLoading'
import { SinglePostProps, UserProps } from '../../types'
import PostAddComment from './PostAddComment/PostAddComment'

const SinglePost = ({
	addedBy,
	caption,
	image,
	likes,
	createdAt,
	id,
	hideLikes,
	turnOffComments,
	mentionedUsers,
	mentionedTags,
	alt,
}: SinglePostProps) => {
	const session = useSession()
	const [isLiked, setIsLiked] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [commentsLength, setCommentsLength] = useState<number>(0)
	const [isSaved, setIsSaved] = useState<boolean>(false)
	const [userData, setUserData] = useState<UserProps | null>(null)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const userId = session?.data?.user?.id

	const addLikeToPost = async () => {
		if (userId) {
			const postData = {
				postId: id,
				postImage: image,
			}
			const isLiked = await likePost(userId, addedBy, postData)
			if (isLiked) {
				setIsLiked(true)
			}
		}
	}
	const removeLikeFromPost = async () => {
		if (userId) {
			const isUnliked = await unlikePost(userId, id)
			if (isUnliked) {
				setIsLiked(false)
			}
		}
	}

	useEffect(() => {
		const checkCommentsLength = async () => {
			const coll = collection(db, 'posts', id, 'comments')
			const snapshot = await getCountFromServer(coll)
			return snapshot.data().count
		}
		const getUserData = async () => {
			const fetchedData = await fetchUserData(addedBy)

			if (fetchedData) {
				setUserData(fetchedData)
			}
		}
		const fetchData = async () => {
			{
				if (userId && id) {
					setIsLiked(await checkIfUserLikedPost(userId, id))
					setIsSaved(await checkIfUserSavedPost(userId, id))
					setCommentsLength(await checkCommentsLength())
					await getUserData()
					setLoading(false)
				}
			}
		}

		fetchData()
	}, [userId, id, addedBy])
	return loading ? (
		<SinglePostLoading />
	) : (
		userData && (
			<Container sx={{ maxWidth: 450 }} mt='xl' mb='xl'>
				<PostHeader
					userPhoto={userData.image}
					username={userData.username}
					createdAt={createdAt}
					postId={id}
					turnOffComments={turnOffComments}
					hideLikes={hideLikes}
					addedBy={addedBy}></PostHeader>
				<PostContent isLiked={isLiked} addLikeToPost={addLikeToPost} image={image}></PostContent>
				{userId && (
					<PostAction
						addLikeToPost={addLikeToPost}
						removeLikeFromPost={removeLikeFromPost}
						isLiked={isLiked}
						isSaved={isSaved}
						postId={id}
						userId={userId}
						setIsSaved={setIsSaved}></PostAction>
				)}
				{hideLikes ? (
					<HiddenLikes likes={likes} isGray={false} />
				) : (
					likes && likes.length > 0 && <Likes isGray={false} likes={likes}></Likes>
				)}

				<PostDescription
					addedBy={userData.id}
					mentionedUsers={mentionedUsers}
					mentionedTags={mentionedTags}
					username={userData.username}
					text={caption}></PostDescription>
				<PostComments comments={commentsLength} postId={id}></PostComments>
				<Divider mb='xs' color='transparent' />
				{!turnOffComments && (
					<PostAddComment
						postData={{
							addedBy,
							alt,
							caption,
							createdAt,
							hideLikes,
							turnOffComments,
							image,
							likes,
							mentionedTags,
							mentionedUsers,
							id,
						}}
					/>
				)}
				<Divider mt='md' color={dark ? '#373637' : '#dadbda'} />
			</Container>
		)
	)
}

export default SinglePost
