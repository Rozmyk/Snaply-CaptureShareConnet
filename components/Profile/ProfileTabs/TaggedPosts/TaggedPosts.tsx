'use client'
import { useEffect, useState } from 'react'
import { Text, Flex } from '@mantine/core'
import { IconUserSquare } from '@tabler/icons-react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import PostsContainer from './PostsContainer/PostsContainer'
import { PostProps } from '../../../../types'
interface TaggedPostsProps {
	userId: string
}
interface updatedPostProps extends PostProps {
	commentsCount: number
}
const TaggedPosts = ({ userId }: TaggedPostsProps) => {
	const [taggedPosts, setTaggedPosts] = useState<updatedPostProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	const getTaggedPosts = async (userId: string) => {
		try {
			const postsRef = collection(db, 'posts')
			const q = query(postsRef, where('mentionedUsers', 'array-contains', userId))
			const querySnapshot = await getDocs(q)

			const fetchedPosts: updatedPostProps[] = []

			for (const docSnap of querySnapshot.docs) {
				const postData = docSnap.data() as updatedPostProps
				const postId = docSnap.id

				let commentsCount = 0

				const commentsCollectionRef = collection(db, 'posts', postId, 'comments')
				const commentsSnap = await getDocs(commentsCollectionRef)
				commentsCount = commentsSnap.size

				fetchedPosts.push({ ...postData, id: postId, commentsCount })
			}

			setTaggedPosts(fetchedPosts)
			setLoading(false)
		} catch (err) {
			console.error('Error fetching tagged posts:', err)
			setLoading(false)
		}
	}

	useEffect(() => {
		getTaggedPosts(userId)
	}, [userId])
	return (
		<>
			<PostsContainer posts={taggedPosts} loading={loading} />

			{taggedPosts && taggedPosts.length < 0 && (
				<Flex sx={{ maxWidth: 350 }} direction='column' justify='center' align='center' mt='50px' gap='sm'>
					<Flex
						justify='center'
						align='center'
						sx={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #262626' }}>
						<IconUserSquare stroke={1} size={40} color='#262626' />
					</Flex>
					<Text fz={30} fw={800}>
						Photos of you
					</Text>
					<Text fz={14}>When people tag you in photos, they&apos;ll appear here.</Text>
				</Flex>
			)}
		</>
	)
}

export default TaggedPosts
