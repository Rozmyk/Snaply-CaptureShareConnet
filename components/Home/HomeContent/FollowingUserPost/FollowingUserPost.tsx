'use client'
import { db } from '@/app/firebase'
import { Text, Center, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import SinglePost from '../../../SinglePost/SinglePost'
import { PostProps } from '../../../../types'
const FollowingUserPost = () => {
	const [posts, setPosts] = useState<PostProps[] | null>(null)
	const [loadingPosts, setLoadingPosts] = useState<boolean>(true)
	const [isEmpty, setIsEmpty] = useState<boolean>(false)
	const session = useSession()
	const followowingUsers = session?.data?.user?.following

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const postsRef = collection(db, 'posts')
				if (!followowingUsers || followowingUsers.length <= 0) {
					setIsEmpty(true)
				} else {
					const q = query(postsRef, where('addedBy', 'in', followowingUsers), orderBy('createdAt', 'desc'))
					const querySnapshot = await getDocs(q)
					const fetchedPosts: PostProps[] = []
					querySnapshot.forEach(doc => {
						const data = doc.data()
						const post: PostProps = {
							id: doc.id,
							addedBy: data.addedBy,
							alt: data.alt,
							caption: data.caption,
							createdAt: data.createdAt,
							hideLikes: data.hideLikes,
							turnOffComments: data.turnOffComments,
							image: data.image,
							likes: data.likes,
							mentionedTags: data.mentionedTags,
							mentionedUsers: data.mentionedUsers,
						}
						fetchedPosts.push(post)
					})

					setPosts(fetchedPosts)
					setLoadingPosts(false)
				}
			} catch (error) {
				console.error('Error fetching posts: ', error)
			}
		}

		fetchPosts()
	}, [followowingUsers])

	return (
		<>
			{isEmpty ? (
				<Center m='xl'>
					<Text fw={500}>No posts found</Text>
				</Center>
			) : loadingPosts ? (
				<Center m='xl'>
					<Loader color='gray' size='sm' />
				</Center>
			) : (
				posts &&
				posts.length > 0 &&
				posts.map(post => {
					return <SinglePost key={post.id} {...post}></SinglePost>
				})
			)}
		</>
	)
}

export default FollowingUserPost
