import { Box } from '@mantine/core'
import SinglePost from '../../../SinglePost/SinglePost'
import { PostProps } from '../../../../types'
interface AllPostProps {
	posts: PostProps[] | null
}
const AllPost = ({ posts }: AllPostProps) => {
	return (
		posts &&
		posts.map(post => (
			<Box key={post.id}>
				<SinglePost {...post} />
			</Box>
		))
	)
}

export default AllPost
