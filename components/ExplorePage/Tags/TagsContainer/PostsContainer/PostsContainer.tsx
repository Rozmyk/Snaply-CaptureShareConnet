import SinglePostCard from '../../../../SinglePostCard/SinglePostCard'
import { SimpleGrid } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { PostProps } from '../../../../../types'
interface updatedPostProps extends PostProps {
	commentsCount: number
}
interface PostsContainerProps {
	postsData: updatedPostProps[] | null
}
const PostsContainer = ({ postsData }: PostsContainerProps) => {
	const { ref, width } = useElementSize()
	let singlePostWidth = width / 3 - 5
	return (
		<SimpleGrid ref={ref} w={'100%'} h='100%' mt='md' spacing='0px' verticalSpacing='xs' cols={3}>
			{postsData &&
				postsData.length > 0 &&
				postsData.map((post, index) => (
					<SinglePostCard comments={post.commentsCount} size={singlePostWidth} key={index} {...post} />
				))}
		</SimpleGrid>
	)
}

export default PostsContainer
