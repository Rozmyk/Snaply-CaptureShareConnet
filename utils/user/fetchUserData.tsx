import { db } from '@/app/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { UserProps } from '../../types'

export const fetchUserData = async (userId: string): Promise<UserProps | undefined> => {
	let userData: UserProps | undefined

	try {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)
		if (docSnap.exists()) {
			const data = docSnap.data()
			if (data) {
				userData = {
					id: docSnap.id,
					...data,
				} as UserProps
			}
		} else {
			console.log('Dokument nie istnieje')
		}
	} catch (error) {
		console.error('Wystąpił błąd podczas pobierania danych użytkownika:', error)
	}

	return userData
}
