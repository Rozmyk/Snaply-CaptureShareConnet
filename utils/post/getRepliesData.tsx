import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { fetchUserData } from '../user/fetchUserData'
import { DownloadCommentRepliesProps } from '../../types'
const getRepliesData = async (postId: string, commentId: string) => {
	const replies: DownloadCommentRepliesProps[] = []

	try {
		const repliesRef = collection(db, 'posts', postId, 'comments', commentId, 'replies')
		const repliesSnapshot = await getDocs(repliesRef)

		repliesSnapshot.forEach(replyDoc => {
			const replyData = replyDoc.data() as DownloadCommentRepliesProps
			replyData.id = replyDoc.id
			replies.push(replyData)
		})

		for (const reply of replies) {
			if (reply.user) {
				const userData = await fetchUserData(reply.user)
				if (userData) {
					reply.userDetails = userData
				}
			}
		}
	} catch (error) {
		console.error(error)
	}

	return replies
}
export default getRepliesData
