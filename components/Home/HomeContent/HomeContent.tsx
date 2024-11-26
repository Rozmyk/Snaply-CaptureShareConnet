'use client'
import { useEffect, useState } from 'react'
import { Grid, Box, Container } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import ContentToggleButton from './ContentToggleButton/ContentToggleButton'
import Stories from './Stories/Stories'
import UserPanel from './UserPanel/UserPanel'
import Footer from '../../Footer/Footer'
import NewUsers from '../NewUsers/NewUsers'
import NewPostsButton from './NewPostsButton/NewPostsButton'
import PostsLoading from './PostsLoading/PostsLoading'
import AllPost from './AllPost/AllPost'
import FollowingUserPost from './FollowingUserPost/FollowingUserPost'
import NewPostsLoader from './NewPostsLoader/NewPostsLoader'
import { usePosts } from './hooks/usePosts'
import { useScroll } from './hooks/useScroll'
import { useRealtimeUpdates } from './hooks/useRealtimeUpdates'
import { useSearchParams } from 'next/navigation'

const HomeContent = () => {
	const { posts, loading, loader, getNextPosts, setPosts } = usePosts()
	const { isUserAtBottom, boxRef } = useScroll()
	const { hasNewPosts, newPosts, setHasNewPosts, setNewPosts } = useRealtimeUpdates(setPosts)

	const getNewPosts = () => {
		setPosts(prevPosts => [...newPosts, ...(prevPosts ?? [])])
		setNewPosts([])
		setHasNewPosts(false)
	}

	useEffect(() => {
		if (isUserAtBottom && !loader) {
			getNextPosts()
		}
	}, [isUserAtBottom, loader, getNextPosts])

	const searchParams = useSearchParams()
	const [activeSection, setActiveSection] = useState('home')

	useEffect(() => {
		const variant = searchParams.get('variant')
		if (variant === 'following') {
			setActiveSection('following')
		} else {
			setActiveSection('home')
		}
	}, [searchParams])

	return (
		<Container mt='lg' size='lg'>
			<Grid gutter='50px'>
				<Grid.Col span={useMediaQuery('(min-width: 1200px)') ? 8 : 12} style={{ position: 'relative' }}>
					{useMediaQuery('(min-width: 1200px)') && <ContentToggleButton />}
					<Stories />
					{loading ? (
						<PostsLoading />
					) : (
						<>
							<NewPostsButton onClick={getNewPosts} visible={hasNewPosts} />
							{activeSection === 'home' ? (
								<Box ref={boxRef}>
									<AllPost posts={posts} />
								</Box>
							) : (
								<FollowingUserPost />
							)}
							<NewPostsLoader loader={loader} />
						</>
					)}
				</Grid.Col>
				{useMediaQuery('(min-width: 1200px)') && (
					<Grid.Col span={4}>
						<UserPanel />
						<NewUsers />
						<Footer compact />
					</Grid.Col>
				)}
			</Grid>
		</Container>
	)
}

export default HomeContent
