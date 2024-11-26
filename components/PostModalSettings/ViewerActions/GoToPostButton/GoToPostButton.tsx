import RegularButton from '../../RegularButton/RegularButton'
import { useRouter } from 'next/navigation'
interface GoToPostButtonProps {
	postId: string
}
const GoToPostButton = ({ postId }: GoToPostButtonProps) => {
	const router = useRouter()
	const handleRedirect = () => {
		router.push(`/post/${postId}`)
	}
	return <RegularButton onClick={handleRedirect}>Go to post</RegularButton>
}

export default GoToPostButton
