import PostContainer from '../../../../components/Post/PostContainer/PostContainer'
const post = ({ params: { id: postId } }: { params: { id: string } }) => {
	return <PostContainer postId={postId} />
}

export default post
