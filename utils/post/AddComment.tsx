import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { sendNotification } from '../user/sendNotification'
import { PostProps } from '../../types'

export const addComment = async (
	userId: string,
	postData: PostProps,
	text: string,
	mentionedUsers: string[] | null,
	mentionedTags: string[] | null
) => {
	try {
		const commentsRef = collection(db, 'posts', postData.id, 'comments')

		const newComment = {
			createdAt: new Date(),
			text: text,
			user: userId,
			mentionedUsers: mentionedUsers,
			mentionedTags: mentionedTags,
		}

		await addDoc(commentsRef, newComment)
		await sendNotification(userId, postData.addedBy, 'commentedYourPost', {
			post: { postId: postData.id, postImage: postData.image },
			content: text,
		})

		return true
	} catch (error) {
		console.error('Error adding comment:', error)
		return false
	}
}
