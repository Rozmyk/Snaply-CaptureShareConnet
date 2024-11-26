'use client'
import { Container } from '@mantine/core'
import DetailsPost from '../../DetailsPost/DetailsPost'
import MoreUserPosts from '../MoreUserPosts/MoreUserPosts'
import Footer from '../../Footer/Footer'
interface PostContainerProps {
	postId: string
}
const PostContainer = ({ postId }: PostContainerProps) => {
	return (
		<Container pt='xl'>
			<DetailsPost />
			<MoreUserPosts postId={postId} />
			<Footer />
		</Container>
	)
}

export default PostContainer
