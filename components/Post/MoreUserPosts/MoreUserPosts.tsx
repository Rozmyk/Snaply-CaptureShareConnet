'use client'
import { collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore'
import { Text, Container, Grid, Divider, useMantineColorScheme } from '@mantine/core'
import { db } from '@/app/firebase'
import { useState, useEffect } from 'react'
import { useElementSize } from '@mantine/hooks'
import SinglePostCard from '../../SinglePostCard/SinglePostCard'
import Link from 'next/link'
import { UserProps, PostProps } from '../../../types'
import { fetchUserData } from '../../../utils/user/fetchUserData'
import { getPostData } from '../../../utils/getPostData'
import MorePostLoading from './MorePostLoading/MorePostLoading'
interface MoreUserPostsProps {
	postId: string
}
interface updatedPostProps extends PostProps {
	comments: number
}
const MoreUserPosts = ({ postId }: MoreUserPostsProps) => {
	const [userPost, setUserPost] = useState<updatedPostProps[] | null>(null)
	const [postData, setPostData] = useState<PostProps | null>(null)
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [loadingPost, setLoadingPost] = useState<boolean>(true)
	const [loadingUser, setLoadingUser] = useState<boolean>(true)
	const { ref, width } = useElementSize()
	const imagePostWidth = width / 3
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const getUserData = async (userId: string) => {
		const fetchedData = await fetchUserData(userId)
		if (fetchedData) {
			setUserData(fetchedData)
			setLoadingUser(false)
		}
	}

	useEffect(() => {
		const fetchPostData = async () => {
			const fetchedData = await getPostData(postId)
			if (fetchedData) {
				setPostData(fetchedData)
			}
		}
		fetchPostData()
	}, [postId])
	useEffect(() => {
		const getUserPost = async (userId: string) => {
			try {
				const postsRef = collection(db, 'posts')
				const q = query(postsRef, where('addedBy', '==', userId), orderBy('createdAt', 'desc'), limit(7))
				const querySnapshot = await getDocs(q)
				const posts: updatedPostProps[] = []

				for (const doc of querySnapshot.docs) {
					if (doc.id === postId) continue

					const postToAdd = doc.data() as updatedPostProps
					postToAdd.id = doc.id

					if (postToAdd.addedBy && postToAdd.createdAt) {
						const commentsRef = collection(doc.ref, 'comments')
						const commentsSnapshot = await getDocs(commentsRef)
						postToAdd.comments = commentsSnapshot.size

						posts.push(postToAdd)
					}

					if (posts.length === 6) break
				}

				if (posts.length > 0) {
					setUserPost(posts)
					setLoadingPost(false)
				}
			} catch (error) {
				console.error(error)
			}
		}
		if (postData) {
			const userId = postData.addedBy
			getUserData(userId)
			getUserPost(userId)
		}
	}, [postData, postId])
	return (
		<Container>
			<Divider m='xl'></Divider>
			{!loadingUser && userData && (
				<Text mb='lg' fw={600} fz={14} color={dark ? '#a8a8a8' : '#737373'}>
					More posts from{' '}
					<Link
						href={`/profile/${userData.username.toLowerCase()}`}
						style={{ color: dark ? 'white' : 'black', textTransform: 'lowercase', textDecoration: 'none' }}>
						{userData.username}
					</Link>
				</Text>
			)}
			<Container ref={ref}>
				{!loadingPost && userPost && userPost.length > 0 ? (
					<Grid>
						{userPost.map(post => {
							return (
								<Grid.Col span={4} key={post.id}>
									<SinglePostCard {...post} size={imagePostWidth} />
								</Grid.Col>
							)
						})}
					</Grid>
				) : (
					<MorePostLoading />
				)}
			</Container>
		</Container>
	)
}
export default MoreUserPosts
