import { db } from '@/app/firebase'
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore'
import { PostProps } from '../types'
import { Timestamp } from 'firebase-admin/firestore'
interface updatedPostProps extends PostProps {
	commentsCount: number
}
export default {
	async postsFirstBatch() {
		try {
			const postsRef = collection(db, 'posts')
			const sortedQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(5))
			const data = await getDocs(sortedQuery)

			let posts = []
			let lastKey = null
			for (const doc of data.docs) {
				const postData = doc.data() as updatedPostProps
				postData.id = doc.id

				const commentsRef = collection(db, 'posts', doc.id, 'comments')
				const commentsSnapshot = await getDocs(commentsRef)
				postData.commentsCount = commentsSnapshot.size

				posts.push({
					...postData,
				})

				lastKey = postData.createdAt
			}

			return { posts, lastKey }
		} catch (error) {
			console.error(error)
			return { posts: [], lastKey: null }
		}
	},

	async postsNextBatch(key: Timestamp) {
		try {
			const postsRef = collection(db, 'posts')
			const sortedQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(5), startAfter(key))

			const data = await getDocs(sortedQuery)

			let posts = [] as updatedPostProps[]
			let lastKey = null

			for (const doc of data.docs) {
				const postData = doc.data() as updatedPostProps
				postData.id = doc.id

				const commentsRef = collection(db, 'posts', doc.id, 'comments')
				const commentsSnapshot = await getDocs(commentsRef)
				postData.commentsCount = commentsSnapshot.size

				posts.push({
					...postData,
				})

				lastKey = postData.createdAt
			}

			const hasMore = data.docs.length === 5

			return { posts, lastKey, hasMore }
		} catch (error) {
			console.error(error)
			return { posts: [], lastKey: null, hasMore: false }
		}
	},
}
