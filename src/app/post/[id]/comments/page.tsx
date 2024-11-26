import CommentsContainer from '../../../../../components/Post/Comments/CommentsContainer/CommentsContainer'
const page = ({ params: { id: postId } }: { params: { id: string } }) => {
	return <CommentsContainer postId={postId} />
}

export default page
