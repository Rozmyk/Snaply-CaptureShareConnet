import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { UserProps } from '../types'

export const getUserDataByUsername = async (username: string) => {
	let userData = null as UserProps | null

	const usersCollection = collection(db, 'users')
	const q = query(usersCollection, where('username', '==', username.toLowerCase()))

	try {
		const querySnapshot = await getDocs(q)
		if (!querySnapshot.empty) {
			querySnapshot.forEach(doc => {
				userData = { ...doc.data(), id: doc.id } as UserProps
			})
		} else {
			console.log('No user found with the given username')
			return null
		}
	} catch (error) {
		console.log('Error getting user data:', error)
	}

	return userData
}
