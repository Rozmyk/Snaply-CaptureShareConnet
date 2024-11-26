'use client'
import { useEffect, useState } from 'react'
import { Text, Flex, Loader, Center, useMantineColorScheme } from '@mantine/core'
import { IconBookmark } from '@tabler/icons-react'
import PostsContainer from '../../PostsContainer/PostsContainer'
import { PostProps } from '../../../../types'
import { getPostDataWithCommentsLength } from '../../../../utils/post/getPostDataWithCommentsLength'
interface updatedPostProps extends PostProps {
	commentsCount: number
}
interface SavedPostProps {
	savedPostIds: string[]
}
const SavedPost = ({ savedPostIds }: SavedPostProps) => {
	const [savedPosts, setSavedPosts] = useState<updatedPostProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	useEffect(() => {
		const getSavedPostsData = async () => {
			setLoading(true)

			const posts: updatedPostProps[] = []

			for (const postId of savedPostIds) {
				const postData = await getPostDataWithCommentsLength(postId)
				if (postData) {
					posts.push(postData)
				}
			}

			setSavedPosts(posts)
			setLoading(false)
		}
		getSavedPostsData()
	}, [savedPostIds])

	return loading ? (
		<Loader mt='lg' color='gray'></Loader>
	) : savedPosts && savedPosts.length > 0 ? (
		<div style={{ width: '100%' }}>
			<Text mb='md' fz='xs' c='dimmed'>
				Only you can see what you&apos;ve saved
			</Text>
			{savedPosts && <PostsContainer loading={loading} posts={savedPosts} />}
		</div>
	) : (
		<Center>
			<Flex sx={{ maxWidth: 350 }} direction='column' justify='center' align='center' mt='50px' gap='sm'>
				<Flex
					justify='center'
					align='center'
					sx={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #262626' }}>
					<IconBookmark stroke={1} size={40} color='#262626' />
				</Flex>
				<Text fz={30} fw={800} color={dark ? 'white' : 'black'}>
					Save
				</Text>
				<Text fz={14}>
					Save photos and videos that you want to see again. No one is notified, and only you can see what you&apos;ve
					saved.
				</Text>
			</Flex>
		</Center>
	)
}

export default SavedPost
