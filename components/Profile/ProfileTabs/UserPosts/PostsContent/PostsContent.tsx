import PostLoading from './PostLoading/PostLoading'
import EmptyPosts from './EmptyPosts/EmptyPosts'
import SinglePostCard from '../../../../SinglePostCard/SinglePostCard'
import { Grid } from '@mantine/core'
import { PostProps } from '../../../../../types'
interface PostsContentProps {
	loading: boolean
	posts: updatedPostProps[] | null
	singlePostWidth: number
	nextPostLoading: boolean
	isCurrentUser: boolean
	noMorePosts: boolean
}
interface updatedPostProps extends PostProps {
	commentsCount: number
}
const PostsContent = ({
	loading,
	posts,
	singlePostWidth,
	nextPostLoading,
	isCurrentUser,
	noMorePosts,
}: PostsContentProps) => {
	return loading ? (
		<PostLoading />
	) : posts && posts.length > 0 ? (
		<>
			{posts &&
				posts.map(post => (
					<Grid.Col span={4} key={post.id}>
						<SinglePostCard comments={post.commentsCount} {...post} size={singlePostWidth}></SinglePostCard>
					</Grid.Col>
				))}
			{nextPostLoading && !noMorePosts && <PostLoading />}
		</>
	) : (
		<EmptyPosts isCurrentUser={isCurrentUser} />
	)
}

export default PostsContent
