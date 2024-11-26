'use client'
import { useState, useEffect } from 'react'
import TagsHeader from '../TagsHeader/TagsHeader'
import { Container, Text, Loader, Center, useMantineColorScheme } from '@mantine/core'
import { db } from '@/app/firebase'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import PostsContainer from './PostsContainer/PostsContainer'
import NoPost from './NoPost/NoPost'
import { PostProps } from '../../../../types'

interface TagsContainerProps {
	tag: string
}

interface updatedPostProps extends PostProps {
	commentsCount: number
}

const TagsContainer = ({ tag }: TagsContainerProps) => {
	const [postsData, setPostsData] = useState<updatedPostProps[] | null>(null)
	const [postsLoading, setPostsLoading] = useState<boolean>(true)
	const [postsLength, setPostsLength] = useState<number>(0)
	const [noPostsForTag, setNoPostsForTag] = useState<boolean>(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const getPosts = async (tag: string) => {
		if (tag) {
			try {
				const postsRef = collection(db, 'posts')
				const searchedTag = '#' + tag

				const q = query(postsRef, where('mentionedTags', 'array-contains', searchedTag), orderBy('createdAt', 'desc'))

				const querySnapshot = await getDocs(q)

				const posts = await Promise.all(
					querySnapshot.docs.map(async doc => {
						const postData = doc.data() as PostProps
						const commentsRef = collection(doc.ref, 'comments')
						const commentsSnapshot = await getDocs(commentsRef)
						const commentsCount = commentsSnapshot.size

						return {
							...postData,
							id: doc.id,
							commentsCount,
						}
					})
				)

				setNoPostsForTag(posts.length === 0)
				if (posts.length > 0) {
					setPostsData(posts)
				}
				setPostsLength(posts.length)
				setPostsLoading(false)
			} catch (error) {
				console.error('Error fetching posts with tag:', error)
				setNoPostsForTag(true)
				setPostsLoading(false)
			}
		}
	}

	useEffect(() => {
		getPosts(tag)
	}, [tag])

	return (
		<Container p='xl'>
			{noPostsForTag ? (
				<NoPost />
			) : postsLoading ? (
				<Center>
					<Loader color='gray'></Loader>
				</Center>
			) : (
				<>
					{postsData && <TagsHeader lastPost={postsData[0]} postsLength={postsLength} tag={tag} />}
					<Text mt='50px' fz={14} sx={{ color: dark ? '#a8a8a8' : '#737373' }}>
						Top posts
					</Text>
					<PostsContainer postsData={postsData} />
				</>
			)}
		</Container>
	)
}

export default TagsContainer
