'use client'
import { useState, useEffect } from 'react'
import { SimpleGrid, Container, Loader, Center, Text, Divider, Box, useMantineColorScheme } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import postService from '../../../utils/postService'
import SinglePostCard from '../../SinglePostCard/SinglePostCard'
import { PostProps } from '../../../types'
import { Timestamp } from 'firebase-admin/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
interface updatedPostProps extends PostProps {
	commentsCount: number
}
const ExploreContainer = () => {
	const [posts, setPosts] = useState<updatedPostProps[]>([])
	const [lastKey, setLastKey] = useState<Timestamp | null>(null)
	const [noMorePostToLoad, setNoMorePostToLoad] = useState<boolean>(false)
	const { ref, width } = useElementSize()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	let singlePostWidth = width / 3 - 5

	const getFirstPosts = async () => {
		try {
			const fetchedPosts = await postService.postsFirstBatch()
			if (fetchedPosts) {
				setPosts(fetchedPosts.posts)
				setLastKey(fetchedPosts.lastKey)
			}
		} catch (error) {
			console.error(error)
		}
	}
	const getNextPosts = async () => {
		try {
			if (lastKey) {
				const fetchedPosts = await postService.postsNextBatch(lastKey)
				if (fetchedPosts) {
					setPosts(prevState => prevState.concat(fetchedPosts.posts))
					setLastKey(fetchedPosts.lastKey)
					setNoMorePostToLoad(!fetchedPosts.hasMore)
				}
			} else {
				setNoMorePostToLoad(true)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getFirstPosts()
	}, [])

	return (
		<Container mih='100vh'>
			<Box m='lg'>
				<Text mb='sm' fz={16} fw={700} color={dark ? 'white' : 'black'}>
					For You
				</Text>
				<Divider w='100%' />
			</Box>
			<InfiniteScroll
				dataLength={posts.length}
				next={getNextPosts}
				hasMore={!noMorePostToLoad}
				loader={
					<Center mt='lg'>
						<Loader color='gray' size='sm' />
					</Center>
				}>
				<SimpleGrid w={'100%'} h='100%' ref={ref} mt='xl' spacing='0px' verticalSpacing='5px' cols={3}>
					{posts.map((post, index) => (
						<SinglePostCard comments={post.commentsCount} {...post} size={singlePostWidth} key={index} />
					))}
				</SimpleGrid>
			</InfiniteScroll>
		</Container>
	)
}

export default ExploreContainer
