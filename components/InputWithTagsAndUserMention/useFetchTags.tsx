import { useState, useEffect } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { v4 as uuidv4 } from 'uuid'
import { DownloadTagProps } from '../../types'
const useFetchTags = () => {
	const [tags, setTags] = useState<DownloadTagProps[]>([])
	const [tagLoading, setTagLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchTags = async () => {
			const postsRef = collection(db, 'posts')
			const q = query(postsRef)
			try {
				const querySnapshot = await getDocs(q)
				const tagCounts: Record<string, number> = {}

				querySnapshot.forEach(doc => {
					const postTags: string[] = doc.data().mentionedTags
					if (postTags && Array.isArray(postTags)) {
						postTags.forEach(tag => {
							tagCounts[tag] = (tagCounts[tag] || 0) + 1
						})
					}
				})

				const tagsArray: DownloadTagProps[] = Object.entries(tagCounts).map(([tag, count]) => ({
					display: tag,
					postLength: count ? count : 0,
					id: uuidv4(),
				}))

				setTags(tagsArray)
				setTagLoading(false)
			} catch (error) {
				console.error('Error fetching tags:', error)
			}
		}

		fetchTags()
	}, [])

	return { tags, tagLoading }
}

export default useFetchTags
