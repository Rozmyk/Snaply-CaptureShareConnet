import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { sendNotification } from '../user/sendNotification'
import { PostProps } from '../../types'
export const addRepliesToComment = async (
	userId: string,
	postData: PostProps,
	commentId: string,
	text: string,
	mentionedUsers: string[] | null,
	mentionedTags: string[] | null
) => {
	try {
		const commentsRef = collection(db, 'posts', postData.id, 'comments', commentId, 'replies')
		const newReplies = {
			createdAt: new Date(),
			text: text,
			user: userId,
			mentionedUsers: mentionedUsers,
			mentionedTags: mentionedTags,
		}

		await addDoc(commentsRef, newReplies)
		await sendNotification(userId, postData.addedBy, 'repliedToComment', {
			post: { postId: postData.id, postImage: postData.image },
			content: text,
		})

		return true
	} catch (error) {
		console.error('Error adding replies:', error)
		return false
	}
}
