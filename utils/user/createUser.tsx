import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { UserProps } from '../../types'
export const createUser = (user: UserProps) => {
	const base_user = {
		email: user?.email,
		description: '',
		username: user?.username,
		name: user?.name,
		completed: true,
		descriptionLink: '',
		private: false,
		image:
			user?.image ||
			'https://firebasestorage.googleapis.com/v0/b/snaply-33e1e.appspot.com/o/snaplyProfilePhoto.png?alt=media&token=360201a3-7f07-4aaa-ac06-b8c72418ff84',
	}

	setDoc(doc(db, 'users', user.id), base_user, { merge: true })
}
