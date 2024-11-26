import { Grid, Loader } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import SinglePostCard from '../../SinglePostCard/SinglePostCard'
import { PostProps } from '../../../types'
interface updatedPostProps extends PostProps {
	commentsCount: number
}
interface PostsContainerProps {
	posts: updatedPostProps[]
	loading: boolean
}
const PostsContainer = ({ posts, loading }: PostsContainerProps) => {
	const { ref, width } = useElementSize()
	let singlePostWidth = width / 3 - 5
	return (
		<Grid sx={{ width: '100%' }} ref={ref} justify='flex-start' align='center' gutter='5px'>
			{loading ? (
				<Loader mt='lg' color='gray'></Loader>
			) : (
				posts.length > 0 &&
				posts.map(post => {
					return (
						<Grid.Col span={4} key={post.id}>
							<SinglePostCard comments={post.commentsCount} {...post} size={singlePostWidth}></SinglePostCard>
						</Grid.Col>
					)
				})
			)}
		</Grid>
	)
}

export default PostsContainer
