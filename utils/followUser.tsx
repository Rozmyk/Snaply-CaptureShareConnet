import { db } from '@/app/firebase'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { sendNotification } from './user/sendNotification'

export const followUser = async (followerId: string, followingId: string) => {
	try {
		const followerRef = doc(db, 'users', followerId)
		const followingRef = doc(db, 'users', followingId)

		await updateDoc(followingRef, {
			followers: arrayUnion(followerId),
		})

		await updateDoc(followerRef, {
			following: arrayUnion(followingId),
		})

		sendNotification(followerId, followingId, 'followUser')

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
