import { Grid, Loader, Text, Flex, useMantineColorScheme } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { IconUsersGroup } from '@tabler/icons-react'
import SinglePostCard from '../../../../SinglePostCard/SinglePostCard'
import { PostProps } from '../../../../../types'
interface updatedPostProps extends PostProps {
	commentsCount: number
}
interface PostContainerProps {
	posts: updatedPostProps[] | null
	loading: boolean
}
const PostsContainer = ({ posts, loading }: PostContainerProps) => {
	const { ref, width } = useElementSize()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	let singlePostWidth = width / 3 - 5
	return (
		<Grid sx={{ width: '100%' }} ref={ref} justify='flex-start' align='center' gutter='5px'>
			{loading ? (
				<Loader mt='lg' color='gray'></Loader>
			) : posts && posts.length > 0 ? (
				posts.map(post => {
					return (
						<Grid.Col span={4} key={post.id}>
							<SinglePostCard {...post} comments={post.commentsCount} size={singlePostWidth}></SinglePostCard>
						</Grid.Col>
					)
				})
			) : (
				<Flex direction='column' align='center' justify='center' w='100%' mt='50px' gap='sm'>
					<Flex
						justify='center'
						align='center'
						sx={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #262626' }}>
						<IconUsersGroup stroke={1} size={40} color='#262626' />
					</Flex>
					<Text fz={30} fw={800} color={dark ? 'white' : 'black'}>
						No photos
					</Text>
				</Flex>
			)}
		</Grid>
	)
}

export default PostsContainer
