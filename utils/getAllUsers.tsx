import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { UserProps } from '../types'

export const getAllUsers = async (): Promise<UserProps[]> => {
	try {
		const usersRef = collection(db, 'users')
		const querySnapshot = await getDocs(usersRef)

		const usersData: UserProps[] = []
		querySnapshot.forEach(doc => {
			const data = doc.data() as Partial<UserProps>
			const user: UserProps = {
				id: doc.id,
				image: data.image || '',
				username: data.username || '',
				name: data.name || '',
				completed: data.completed || false,
				description: data.description || '',
				descriptionLink: data.descriptionLink || '',
				email: data.email || '',
				followers: data.followers || [],
				following: data.following || [],
				private: data.private || false,
				savedPosts: data.savedPosts || null,
				savedStories: data.savedStories || null,
			}
			usersData.push(user)
		})

		return usersData
	} catch (error) {
		console.error('Błąd podczas pobierania użytkowników:', error)
		return []
	}
}
